/**
 * Trip Execution Test Utilities
 * 
 * Helper functions for testing and debugging trip execution functionality.
 * Use these in browser console or in test files.
 */

import { TripExecutionService, JurisdictionState } from './tripExecutionService';

/**
 * Test Utilities Class
 */
export class TripExecutionTestUtils {
  /**
   * Create a test trip with sample jurisdictions
   */
  static createTestTrip(tripId: string = 'TEST-001'): void {
    const testJurisdictions: JurisdictionState[] = [
      {
        code: 'NY',
        name: 'New York',
        status: 'pending',
        permitStatus: 'Approved',
        permitNumber: 'NY-2024-001',
        requiresPilotCar: true,
        pilotCarJobIds: ['JOB-101', 'JOB-102']
      },
      {
        code: 'NJ',
        name: 'New Jersey',
        status: 'pending',
        permitStatus: 'Approved',
        permitNumber: 'NJ-2024-002',
        requiresPilotCar: false // NJ doesn't need pilot car
      },
      {
        code: 'PA',
        name: 'Pennsylvania',
        status: 'pending',
        permitStatus: 'Approved',
        permitNumber: 'PA-2024-003',
        requiresPilotCar: true,
        pilotCarJobIds: ['JOB-103']
      }
    ];

    try {
      const state = TripExecutionService.startTrip(tripId, testJurisdictions);
      console.log('✅ Test trip created successfully:', state);
      console.log('📍 Current jurisdiction:', state.jurisdictions[0].code);
      console.log('🔔 Notifications sent:', state.pilotCarNotifications.length);
    } catch (error) {
      console.error('❌ Failed to create test trip:', error);
    }
  }

  /**
   * Simulate a complete trip workflow
   */
  static async simulateCompleteTrip(tripId: string = 'TEST-002'): Promise<void> {
    console.log('🚀 Starting trip simulation...');
    
    const jurisdictions: JurisdictionState[] = [
      { 
        code: 'CA', 
        name: 'California',
        status: 'pending', 
        permitStatus: 'Approved', 
        permitNumber: 'CA-001',
        requiresPilotCar: true,
        pilotCarJobIds: ['JOB-201']
      },
      { 
        code: 'NV', 
        name: 'Nevada',
        status: 'pending', 
        permitStatus: 'Approved', 
        permitNumber: 'NV-002',
        requiresPilotCar: false // Nevada doesn't require pilot car
      },
      { 
        code: 'AZ', 
        name: 'Arizona',
        status: 'pending', 
        permitStatus: 'Approved', 
        permitNumber: 'AZ-003',
        requiresPilotCar: true,
        pilotCarJobIds: ['JOB-202']
      }
    ];

    try {
      // Start trip
      console.log('\n1️⃣ Starting trip...');
      const state1 = TripExecutionService.startTrip(tripId, jurisdictions);
      console.log('   ✅ Trip started, status:', state1.status);
      console.log('   📍 Active jurisdiction:', state1.jurisdictions[0].code);

      // Wait a bit (simulate time passing)
      await this.wait(1000);

      // Start break
      console.log('\n2️⃣ Starting break...');
      const state2 = TripExecutionService.startBreak(tripId);
      console.log('   ✅ Break started');
      console.log('   ⏱️ Break ID:', state2.activeBreak?.id);

      // Wait for break
      await this.wait(2000);

      // End break
      console.log('\n3️⃣ Ending break...');
      const state3 = TripExecutionService.endBreak(tripId);
      console.log('   ✅ Break ended');
      console.log('   ⏱️ Duration:', state3.breaks[state3.breaks.length - 1].duration, 'seconds');

      // Complete first jurisdiction
      console.log('\n4️⃣ Completing CA...');
      const state4 = TripExecutionService.completeJurisdiction(tripId);
      console.log('   ✅ CA completed');
      console.log('   📍 Now active:', state4.jurisdictions[state4.currentJurisdictionIndex].code);

      await this.wait(1000);

      // Complete second jurisdiction
      console.log('\n5️⃣ Completing NV...');
      const state5 = TripExecutionService.completeJurisdiction(tripId);
      console.log('   ✅ NV completed');
      console.log('   📍 Now active:', state5.jurisdictions[state5.currentJurisdictionIndex].code);

      await this.wait(1000);

      // Complete final jurisdiction
      console.log('\n6️⃣ Completing AZ (final)...');
      const state6 = TripExecutionService.completeJurisdiction(tripId);
      console.log('   ✅ AZ completed');
      console.log('   🎉 Trip status:', state6.status);
      console.log('   ⏱️ Total duration:', TripExecutionService.formatDuration(state6.totalDuration || 0));

      console.log('\n✅ Trip simulation completed successfully!');
      console.log('\n📊 Final State:');
      console.log('   - Status:', state6.status);
      console.log('   - Jurisdictions completed:', state6.jurisdictions.filter(j => j.status === 'completed').length);
      console.log('   - Total breaks:', state6.breaks.length);
      console.log('   - Notifications sent:', state6.pilotCarNotifications.length);
      
    } catch (error) {
      console.error('❌ Simulation failed:', error);
    }
  }

  /**
   * Test break functionality
   */
  static testBreakTracking(tripId: string = 'TEST-BREAK'): void {
    console.log('🧪 Testing break tracking...');

    const jurisdictions: JurisdictionState[] = [
      { code: 'TX', status: 'pending', permitStatus: 'Approved' }
    ];

    try {
      // Start trip
      console.log('\n1. Starting trip...');
      TripExecutionService.startTrip(tripId, jurisdictions);

      // Try to start break
      console.log('\n2. Starting break...');
      const state1 = TripExecutionService.startBreak(tripId);
      console.log('   ✅ Break started');

      // Try to start another break (should fail)
      console.log('\n3. Trying to start second break (should fail)...');
      try {
        TripExecutionService.startBreak(tripId);
        console.log('   ❌ UNEXPECTED: Second break started!');
      } catch (error) {
        console.log('   ✅ EXPECTED: Cannot start second break');
        console.log('   Error:', error instanceof Error ? error.message : error);
      }

      // Try to complete jurisdiction during break (should fail)
      console.log('\n4. Trying to complete jurisdiction during break (should fail)...');
      try {
        TripExecutionService.completeJurisdiction(tripId);
        console.log('   ❌ UNEXPECTED: Jurisdiction completed during break!');
      } catch (error) {
        console.log('   ✅ EXPECTED: Cannot complete jurisdiction');
        console.log('   Error:', error instanceof Error ? error.message : error);
      }

      // End break
      console.log('\n5. Ending break...');
      const state2 = TripExecutionService.endBreak(tripId);
      console.log('   ✅ Break ended');
      console.log('   Duration:', state2.breaks[0].duration, 'seconds');

      console.log('\n✅ Break tracking tests passed!');
      
    } catch (error) {
      console.error('❌ Break tracking test failed:', error);
    } finally {
      // Cleanup
      TripExecutionService.clearTripState(tripId);
    }
  }

  /**
   * Test validation rules
   */
  static testValidation(): void {
    console.log('🧪 Testing validation rules...');

    // Test 1: Cannot start trip without approved permit
    console.log('\n1. Testing: Cannot start without approved permit');
    const noPermitJurisdictions: JurisdictionState[] = [
      { code: 'FL', status: 'pending', permitStatus: 'Pending' }
    ];
    const canStart1 = TripExecutionService.canStartTrip('TEST-VALIDATE-1', noPermitJurisdictions);
    console.log('   Can start:', canStart1.canStart);
    console.log('   Reason:', canStart1.reason);
    console.log(canStart1.canStart ? '   ❌ FAIL' : '   ✅ PASS');

    // Test 2: Can start trip with approved permit
    console.log('\n2. Testing: Can start with approved permit');
    const approvedJurisdictions: JurisdictionState[] = [
      { code: 'FL', status: 'pending', permitStatus: 'Approved' }
    ];
    const canStart2 = TripExecutionService.canStartTrip('TEST-VALIDATE-2', approvedJurisdictions);
    console.log('   Can start:', canStart2.canStart);
    console.log(canStart2.canStart ? '   ✅ PASS' : '   ❌ FAIL');

    // Test 3: Cannot start trip with no jurisdictions
    console.log('\n3. Testing: Cannot start with no jurisdictions');
    const canStart3 = TripExecutionService.canStartTrip('TEST-VALIDATE-3', []);
    console.log('   Can start:', canStart3.canStart);
    console.log('   Reason:', canStart3.reason);
    console.log(canStart3.canStart ? '   ❌ FAIL' : '   ✅ PASS');

    console.log('\n✅ Validation tests completed!');
  }

  /**
   * View current trip state
   */
  static viewTripState(tripId: string): void {
    const state = TripExecutionService.getTripState(tripId);
    
    if (!state) {
      console.log(`❌ No trip found with ID: ${tripId}`);
      return;
    }

    console.log('📊 Trip State:', tripId);
    console.log('━'.repeat(50));
    console.log('Status:', state.status);
    console.log('Started:', state.startTime?.toLocaleString() || 'Not started');
    console.log('Current Jurisdiction:', state.jurisdictions[state.currentJurisdictionIndex]?.code || 'None');
    console.log('\nJurisdictions:');
    state.jurisdictions.forEach((j, i) => {
      const icon = j.status === 'completed' ? '✅' : j.status === 'active' ? '🔵' : '⚪';
      console.log(`  ${icon} ${j.code} - ${j.status} (${j.permitStatus})`);
    });
    console.log('\nBreaks:', state.breaks.length);
    state.breaks.forEach((b, i) => {
      console.log(`  ${i + 1}. ${b.jurisdictionCode} - ${b.duration}s`);
    });
    console.log('\nNotifications:', state.pilotCarNotifications.length);
    console.log('Active Break:', state.activeBreak ? '⏸️ YES' : 'No');
    console.log('━'.repeat(50));
  }

  /**
   * Clear trip state
   */
  static clearTrip(tripId: string): void {
    TripExecutionService.clearTripState(tripId);
    console.log(`🗑️ Trip ${tripId} cleared from storage`);
  }

  /**
   * List all trips in storage
   */
  static listAllTrips(): void {
    const trips: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('trip_execution_')) {
        trips.push(key.replace('trip_execution_', ''));
      }
    }

    console.log('📋 Trips in Storage:', trips.length);
    trips.forEach((tripId, i) => {
      const state = TripExecutionService.getTripState(tripId);
      console.log(`  ${i + 1}. ${tripId} - ${state?.status || 'Unknown'}`);
    });
  }

  /**
   * Helper: Wait for specified milliseconds
   */
  private static wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Run all tests
   */
  static runAllTests(): void {
    console.log('🧪 Running all trip execution tests...\n');
    
    this.testValidation();
    console.log('\n' + '='.repeat(50) + '\n');
    
    this.testBreakTracking();
    console.log('\n' + '='.repeat(50) + '\n');
    
    console.log('✅ All tests completed!');
  }
}

// Make available in browser console
if (typeof window !== 'undefined') {
  (window as any).TripExecutionTestUtils = TripExecutionTestUtils;
  console.log('💡 Trip Execution Test Utils loaded! Try:');
  console.log('   TripExecutionTestUtils.createTestTrip()');
  console.log('   TripExecutionTestUtils.simulateCompleteTrip()');
  console.log('   TripExecutionTestUtils.testBreakTracking()');
  console.log('   TripExecutionTestUtils.testValidation()');
  console.log('   TripExecutionTestUtils.viewTripState("REQ-1001")');
  console.log('   TripExecutionTestUtils.listAllTrips()');
  console.log('   TripExecutionTestUtils.runAllTests()');
}

export default TripExecutionTestUtils;