#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function calculateDialogueRatio(filePath) {
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Remove code blocks and other markdown elements that might contain 「」
  const cleanedContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, ''); // Remove inline code
  
  // Extract all dialogue (text within 「」)
  const dialogueMatches = cleanedContent.match(/「[^」]*」/g) || [];
  const dialogueText = dialogueMatches.join('');
  const dialogueLength = dialogueText.length;
  
  // Calculate narrative text (everything else)
  // Remove all dialogue from the content
  let narrativeText = cleanedContent;
  dialogueMatches.forEach(dialogue => {
    narrativeText = narrativeText.replace(dialogue, '');
  });
  
  // Remove markdown syntax and whitespace for accurate count
  narrativeText = narrativeText
    .replace(/^#+\s+.*$/gm, '') // Remove headers
    .replace(/\n+/g, ' ') // Replace multiple newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  const narrativeLength = narrativeText.length;
  const totalLength = dialogueLength + narrativeLength;
  
  // Calculate ratios
  const dialogueRatio = totalLength > 0 ? (dialogueLength / totalLength * 100).toFixed(2) : 0;
  const narrativeRatio = totalLength > 0 ? (narrativeLength / totalLength * 100).toFixed(2) : 0;
  
  return {
    dialogueLength,
    narrativeLength,
    totalLength,
    dialogueRatio: parseFloat(dialogueRatio),
    narrativeRatio: parseFloat(narrativeRatio),
    dialogueCount: dialogueMatches.length
  };
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node dialogue-ratio.js <markdown-file>');
    process.exit(1);
  }
  
  const filePath = path.resolve(args[0]);
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File "${filePath}" not found`);
    process.exit(1);
  }
  
  if (!filePath.endsWith('.md')) {
    console.error('Error: File must be a markdown file (.md)');
    process.exit(1);
  }
  
  try {
    const result = calculateDialogueRatio(filePath);
    
    console.log(`\n📊 Analysis for: ${path.basename(filePath)}`);
    console.log('─'.repeat(50));
    console.log(`会話文の文字数: ${result.dialogueLength.toLocaleString()} 文字`);
    console.log(`地の文の文字数: ${result.narrativeLength.toLocaleString()} 文字`);
    console.log(`合計文字数: ${result.totalLength.toLocaleString()} 文字`);
    console.log(`会話の数: ${result.dialogueCount} 個`);
    console.log('─'.repeat(50));
    console.log(`会話文の比率: ${result.dialogueRatio}%`);
    console.log(`地の文の比率: ${result.narrativeRatio}%`);
    console.log('');
    
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { calculateDialogueRatio };