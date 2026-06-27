import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { TieredResults, Job } from '../types.js';

function formatJob(job: Job): string {
  return `- **${job.title}**\n  - ${job.link}\n  - ${job.snippet}\n  - Domain: ${job.domain}\n  - Tier: ${job.tier}\n`;
}

function buildMarkdown(results: TieredResults): string {
  const lines: string[] = [];

  lines.push('# StartupScraper Digest');
  lines.push('');
  lines.push(`_Generated: ${results.metadata.timestamp}_`);
  lines.push('');
  lines.push(`- Total results found: **${results.metadata.totalFound}**`);
  lines.push(`- New jobs: **${results.metadata.newJobs}**`);
  lines.push(`- Duplicates removed: **${results.metadata.duplicatesRemoved}**`);
  lines.push(`- Queries executed: **${results.metadata.queriesExecuted}**`);
  lines.push('');

  if (results.tier1.length > 0) {
    lines.push('## Tier 1 — Strict Matches');
    lines.push('');
    results.tier1.forEach((job) => {
      lines.push(formatJob(job));
    });
    lines.push('');
  }

  if (results.tier2.length > 0) {
    lines.push('## Tier 2 — Broad Matches');
    lines.push('');
    results.tier2.forEach((job) => {
      lines.push(formatJob(job));
    });
    lines.push('');
  }

  return lines.join('\n');
}

export async function generateMarkdown(
  results: TieredResults,
  markdownDir: string,
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `startup-scraper-${timestamp}.md`;
  const outputPath = join(markdownDir, filename);

  await mkdir(markdownDir, { recursive: true });
  const markdown = buildMarkdown(results);
  await writeFile(outputPath, markdown, 'utf8');

  return outputPath;
}
