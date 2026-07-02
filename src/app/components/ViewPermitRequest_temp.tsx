                        <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                          {/* Summary Stats */}
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <div className="bg-white rounded-lg p-2 sm:p-3 border border-blue-200">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 uppercase tracking-wide">Total Jobs</p>
                              <p className="text-base sm:text-xl font-bold text-gray-900">{completedJobs.length}</p>
                            </div>
                            <div className="bg-white rounded-lg p-2 sm:p-3 border border-green-200">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 uppercase tracking-wide">Approved</p>
                              <p className="text-base sm:text-xl font-bold text-green-700">{approvedCount}</p>
                            </div>
                            <div className="bg-white rounded-lg p-2 sm:p-3 border border-orange-200">
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 uppercase tracking-wide">Pending</p>
                              <p className="text-base sm:text-xl font-bold text-orange-700">{completedJobs.length - approvedCount}</p>
                            </div>
                          </div>

                          <Separator />

                          {/* Consolidated Line Items */}
                          <div>
                            <p className="font-semibold text-xs sm:text-sm text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                              <span className="truncate">Consolidated Charges Across All Jobs</span>
                            </p>

                            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                              {/* Table Header - Hidden on mobile, shown on desktop */}
                              <div className="hidden sm:grid grid-cols-12 gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
                                <div className="col-span-5">Description</div>
                                <div className="col-span-2 text-right">Total Qty</div>
                                <div className="col-span-2 text-right">Rate</div>
                                <div className="col-span-3 text-right">Amount</div>
                              </div>

                              {/* Line Items */}
                              <div className="divide-y divide-gray-200">
                                {/* Base Mileage */}
                                <div className="px-2 sm:px-3 py-2 sm:py-2.5">
                                  {/* Mobile Layout */}
                                  <div className="sm:hidden space-y-1.5">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 text-sm">Base Mileage Charge</p>
                                        <p className="text-xs text-gray-500">Total distance across all jobs</p>
                                      </div>
                                      <p className="font-bold text-gray-900 text-sm whitespace-nowrap">${totalBaseMileage.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>{totalDistance.toLocaleString()} km × ${baseRate.toFixed(2)}</span>
                                    </div>
                                  </div>
                                  {/* Desktop Layout */}
                                  <div className="hidden sm:grid grid-cols-12 gap-2 text-sm">
                                    <div className="col-span-5">
                                      <p className="font-medium text-gray-900">Base Mileage Charge</p>
                                      <p className="text-xs text-gray-500">Total distance across all jobs</p>
                                    </div>
                                    <div className="col-span-2 text-right text-gray-700 font-medium">{totalDistance.toLocaleString()} km</div>
                                    <div className="col-span-2 text-right text-gray-700">${baseRate.toFixed(2)}</div>
                                    <div className="col-span-3 text-right font-bold text-gray-900">${totalBaseMileage.toFixed(2)}</div>
                                  </div>
                                </div>

                                {/* Waiting Time */}
                                <div className="px-2 sm:px-3 py-2 sm:py-2.5">
                                  {/* Mobile Layout */}
                                  <div className="sm:hidden space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="font-medium text-gray-900 text-sm">Waiting Time</p>
                                      <p className="font-bold text-gray-900 text-sm">${totalWaitingCharge.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>{totalWaitingHours.toFixed(1)} hrs × ${waitingRate.toFixed(2)}/hr</span>
                                    </div>
                                  </div>
                                  {/* Desktop Layout */}
                                  <div className="hidden sm:grid grid-cols-12 gap-2 text-sm">
                                    <div className="col-span-5">
                                      <p className="font-medium text-gray-900">Waiting Time</p>
                                    </div>
                                    <div className="col-span-2 text-right text-gray-700 font-medium">{totalWaitingHours.toFixed(1)} hrs</div>
                                    <div className="col-span-2 text-right text-gray-700">${waitingRate.toFixed(2)}/hr</div>
                                    <div className="col-span-3 text-right font-bold text-gray-900">${totalWaitingCharge.toFixed(2)}</div>
                                  </div>
                                </div>

                                {/* Layover Days */}
                                <div className="px-2 sm:px-3 py-2 sm:py-2.5">
                                  {/* Mobile Layout */}
                                  <div className="sm:hidden space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="font-medium text-gray-900 text-sm">Layover Days</p>
                                      <p className="font-bold text-gray-900 text-sm">${totalLayoverCharge.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>{totalLayoverDays} days × ${layoverRate.toFixed(2)}/day</span>
                                    </div>
                                  </div>
                                  {/* Desktop Layout */}
                                  <div className="hidden sm:grid grid-cols-12 gap-2 text-sm">
                                    <div className="col-span-5">
                                      <p className="font-medium text-gray-900">Layover Days</p>
                                    </div>
                                    <div className="col-span-2 text-right text-gray-700 font-medium">{totalLayoverDays} days</div>
                                    <div className="col-span-2 text-right text-gray-700">${layoverRate.toFixed(2)}/day</div>
                                    <div className="col-span-3 text-right font-bold text-gray-900">${totalLayoverCharge.toFixed(2)}</div>
                                  </div>
                                </div>

                                {/* Overtime Hours */}
                                <div className="px-2 sm:px-3 py-2 sm:py-2.5">
                                  {/* Mobile Layout */}
                                  <div className="sm:hidden space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="font-medium text-gray-900 text-sm">Overtime Hours</p>
                                      <p className="font-bold text-gray-900 text-sm">${totalOvertimeCharge.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>{totalOvertimeHours.toFixed(1)} hrs × ${overtimeRate.toFixed(2)}/hr</span>
                                    </div>
                                  </div>
                                  {/* Desktop Layout */}
                                  <div className="hidden sm:grid grid-cols-12 gap-2 text-sm">
                                    <div className="col-span-5">
                                      <p className="font-medium text-gray-900">Overtime Hours</p>
                                    </div>
                                    <div className="col-span-2 text-right text-gray-700 font-medium">{totalOvertimeHours.toFixed(1)} hrs</div>
                                    <div className="col-span-2 text-right text-gray-700">${overtimeRate.toFixed(2)}/hr</div>
                                    <div className="col-span-3 text-right font-bold text-gray-900">${totalOvertimeCharge.toFixed(2)}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Grand Total */}
                              <div className="px-2 sm:px-3 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 border-t-2 border-blue-700">
                                {/* Mobile Layout */}
                                <div className="sm:hidden flex items-center justify-between">
                                  <span className="font-bold text-white text-sm">Grand Total (All Jobs)</span>
                                  <span className="font-bold text-xl text-white">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                {/* Desktop Layout */}
                                <div className="hidden sm:grid grid-cols-12 gap-2">
                                  <div className="col-span-9 text-right font-bold text-white text-base">Grand Total (All Jobs)</div>
                                  <div className="col-span-3 text-right font-bold text-2xl text-white">${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Job Breakdown Link */}
                          <div className="bg-white border border-blue-200 rounded-lg p-2.5 sm:p-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                              <p className="text-xs sm:text-sm text-gray-700 truncate">See individual job invoices below for detailed breakdown</p>
                            </div>
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                          </div>
                        </CardContent>
