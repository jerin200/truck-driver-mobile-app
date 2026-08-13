/**
 * Supporting-evidence attachments for invoices and disputes.
 *
 * Evidence reaches the app two ways: the driver uploads real `File` objects
 * when raising a dispute, and the backend returns descriptors for files the
 * pilot car party attached. Both are normalised to `EvidenceItem` so the UI can
 * list and download them the same way.
 *
 * Descriptor-only items have no bytes in this prototype, so a stand-in PDF or
 * JPEG is generated on download. Swap `materialise()` for a fetch against the
 * document service when the real endpoint exists.
 */

export type EvidenceKind = "photo" | "document";

export interface EvidenceItem {
  id: string;
  name: string;
  kind: EvidenceKind;
  /** Human-readable size, e.g. "412 KB". */
  size: string;
  /** Present only when the file itself is in memory (driver uploads). */
  file?: File;
}

/** "412 KB" / "1.8 MB" */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Uppercase extension used as the type badge, e.g. "PDF", "JPG". */
export function extensionOf(name: string): string {
  const ext = name.split(".").pop();
  return ext && ext !== name ? ext.toUpperCase() : "FILE";
}

export function kindOfFile(file: File): EvidenceKind {
  return file.type.startsWith("image/") ? "photo" : "document";
}

/** Normalises the driver's uploads from the Raise Dispute sheet. */
export function fromFiles(files: File[], idPrefix = "upload"): EvidenceItem[] {
  return files.map((file, index) => ({
    id: `${idPrefix}-${index}-${file.name}`,
    name: file.name,
    kind: kindOfFile(file),
    size: formatBytes(file.size),
    file,
  }));
}

/* ── stand-in file generation ────────────────────────────── */

/** Minimal single-page PDF with a real cross-reference table. */
function buildPdf(title: string, lines: string[]): Blob {
  const escape = (s: string) => s.replace(/([\\()])/g, "\\$1");
  const text = [title, "", ...lines]
    .map((line) => `(${escape(line)}) Tj T*`)
    .join("\n");
  const content = `BT\n/F1 12 Tf\n56 780 Td\n16 TL\n${text}\nET\n`;

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] " +
      "/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  // Offsets are byte offsets; every character written here is ASCII, so string
  // length and byte length agree.
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefAt = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf +=
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n` +
    `startxref\n${xrefAt}\n%%EOF\n`;

  return new Blob([pdf], { type: "application/pdf" });
}

/** Placeholder photo captioned with the attachment's own details. */
function buildImage(item: EvidenceItem): Promise<Blob> {
  const width = 1280;
  const height = 854;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return Promise.resolve(
      new Blob([item.name], { type: "text/plain" }),
    );
  }

  const backdrop = ctx.createLinearGradient(0, 0, width, height);
  backdrop.addColorStop(0, "#1f2937");
  backdrop.addColorStop(1, "#111827");
  ctx.fillStyle = backdrop;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#F89823";
  ctx.lineWidth = 8;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 54px Helvetica, Arial, sans-serif";
  ctx.fillText(item.name, 72, 150);

  ctx.fillStyle = "#F89823";
  ctx.font = "600 34px Helvetica, Arial, sans-serif";
  ctx.fillText("Supporting evidence", 72, 214);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "28px Helvetica, Arial, sans-serif";
  ctx.fillText("Overwize Connect · evidence attachment", 72, height - 96);
  ctx.fillText(new Date().toLocaleString(), 72, height - 56);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) =>
        resolve(blob ?? new Blob([item.name], { type: "text/plain" })),
      "image/jpeg",
      0.92,
    );
  });
}

/** Returns the bytes to hand the browser for a given attachment. */
async function materialise(item: EvidenceItem): Promise<Blob> {
  if (item.file) return item.file;
  if (item.kind === "photo") return buildImage(item);
  return buildPdf(item.name, [
    "Supporting evidence attached to this invoice.",
    "",
    "Overwize Connect · generated preview copy.",
    `Downloaded ${new Date().toLocaleString()}`,
  ]);
}

/**
 * Saves the attachment to the device. Resolves once the download has been
 * handed off; rejects only if the blob could not be produced.
 */
export async function downloadEvidence(item: EvidenceItem): Promise<void> {
  const blob = await materialise(item);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = item.name;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();

  // Give the browser a moment to start reading before releasing the handle.
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
