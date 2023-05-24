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
const isValidMessage = (str) => !getMessagesKindsToSkip().some(messageKind => str.indexOf(messageKind) === 0);


const allowedBranchPatterns = [
  '^feature\/.+$',
  '^feat\/.+$',
  '^hotfix\/.+$',
  '^hf\/.+$'
];
const isAllowedBranch = (branchName) => {
  return allowedBranchPatterns
    .map(branchPattern => new RegExp(branchPattern))
    .some(branchPattern => branchName.match(branchPattern));
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


module.exports = {
  getBranchName,
  getCommentSymbol,
  getGitCommitMessageLines,
  isValidMessage,
  isAllowedBranch,
  setGitCommitMessageLines
}
