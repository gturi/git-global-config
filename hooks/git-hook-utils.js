const fs = require('fs');
const execSync = require('child_process').execSync;

let commentSymbol;
const getCommentSymbol = () => {
  if (!commentSymbol) {
    commentSymbol = execSync('git config --get core.commentchar', { encoding: 'utf-8' }).split('\n')[0];
  }
  return commentSymbol;
}

const getMessagesKindsToSkip = () => [
  'Merge branch',
  'Merge pull request',
  getCommentSymbol()
];
const isMessageKindToSkip = (str) => getMessagesKindsToSkip().some(messageKind => str.indexOf(messageKind) === 0);


const allowedBranchPatterns = [
  'feature',
  'feat',
  'hotfix',
  'hf',
  'bugfix',
  'fix'
].join('|');
const isAllowedBranch = (branchName) => {
  // issue tracking systems usually contain a numeric id
  const ticketNumberPattern = ".*\\d+.*";
  const branchPattern = `^(${allowedBranchPatterns})\\/${ticketNumberPattern}$`;
  return branchName.match(new RegExp(branchPattern));
};

let branchName;
const getBranchName = () => {
  if (!branchName) {
    branchName = execSync('git branch --show-current', { encoding: 'utf-8' }).split('\n')[0];
  }
  return branchName;
}

const getGitCommitMessageLines = (gitCommitMessageFile) => {
  const message = fs.readFileSync(gitCommitMessageFile, { encoding: 'utf-8' });
  return message.split('\n');
}

const setGitCommitMessageLines = (gitCommitMessageFile, messageLines) => {
  fs.writeFileSync(gitCommitMessageFile, messageLines, { encoding: 'utf-8' });
}

const getTicketNumber = (branchName) => branchName.split('/').pop();

module.exports = {
  getBranchName,
  getCommentSymbol,
  getGitCommitMessageLines,
  getTicketNumber,
  isMessageKindToSkip,
  isAllowedBranch,
  setGitCommitMessageLines
}
