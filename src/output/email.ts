import type { TieredResults } from '../types.js';

interface SendEmailOptions {
  resendApiKey: string;
  resendFromEmail: string;
}

function buildEmailBody(results: TieredResults): string {
  const lines: string[] = [];

  lines.push('StartupScraper Digest');
  lines.push('');
  lines.push(`Generated: ${results.metadata.timestamp}`);
  lines.push('');
  lines.push(`Total results found: ${results.metadata.totalFound}`);
  lines.push(`New jobs: ${results.metadata.newJobs}`);
  lines.push(`Duplicates removed: ${results.metadata.duplicatesRemoved}`);
  lines.push(`Queries executed: ${results.metadata.queriesExecuted}`);
  lines.push('');

  if (results.tier1.length > 0) {
    lines.push('Tier 1 — Strict Matches');
    lines.push('');
    results.tier1.forEach((job) => {
      lines.push(`- ${job.title}`);
      lines.push(`  ${job.link}`);
      lines.push(`  ${job.snippet}`);
      lines.push(`  Domain: ${job.domain}`);
      lines.push(`  Tier: ${job.tier}`);
      lines.push('');
    });
  }

  if (results.tier2.length > 0) {
    lines.push('Tier 2 — Broad Matches');
    lines.push('');
    results.tier2.forEach((job) => {
      lines.push(`- ${job.title}`);
      lines.push(`  ${job.link}`);
      lines.push(`  ${job.snippet}`);
      lines.push(`  Domain: ${job.domain}`);
      lines.push(`  Tier: ${job.tier}`);
      lines.push('');
    });
  }

  return lines.join('\n');
}

export async function sendDigestEmail(
  results: TieredResults,
  emailTo: string,
  options: SendEmailOptions,
): Promise<void> {
  const body = buildEmailBody(results);

  // This is a minimal stub implementation.
  // Replace with a real email API integration if needed.
  console.log('📧 Sending email digest');
  console.log(`To: ${emailTo}`);
  console.log(`From: ${options.resendFromEmail}`);
  console.log('---');
  console.log(body);
  console.log('---');

  // In a real implementation, you would call the Resend API here.
}
