/**
 * Base producers config
 * params <queueName> <jobQtd>
 */
import Bull from 'bull';
import { argv } from 'process';
import { TestJobData } from '../types/TestJobData';
import testSampleData  from './sample-data/test.json';

const params = {
  queueName: argv[2],
  jobs: Number.parseInt(argv[3]) > 0 ? Number.parseInt(argv[3]) : 1,
};

const producer = new Bull('simple-queue');

const getSampleData = (queueName: string) => {
  const sampleData: Record<string, TestJobData> = {
    test: testSampleData
  }
  return sampleData[queueName];
}

const data = getSampleData(params.queueName);

if (typeof data === 'undefined') {
  console.error('Sample data not found');
  process.exit(1);
}

producer.add(data).then(job => {
  console.log(job);
  process.exit(0);
});

