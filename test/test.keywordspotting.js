import TestHelper from './helpers.js';
import JsSpeechRecognizer from '../JsSpeechRecognizer.js';

const CONFIDENCE_THRESHOLD = 0.5;
const ERROR_THRESHOLD = 0.05;

describe('keyword-spotting', () => {
  it('should recognize a wakeword given a recorded sample', (done) => {
    const jsSpeechRecognizer = new JsSpeechRecognizer();
    const testHelper = new TestHelper(jsSpeechRecognizer);

    const model = testHelper.generateModelFromSamples('mozilla', ['resources/mozilla.wav']);

    model.then(() => {
      const result = testHelper.testSampleAgainstModel('resources/mozilla.wav');
      chai.assert(result.confidenceValue >= CONFIDENCE_THRESHOLD, "Confidence under threshold");
      chai.assert(result.error < ERROR_THRESHOLD, "Error too high");
      done();
    });
  });
});