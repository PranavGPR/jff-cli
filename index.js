#!/usr/bin/env node

import 'dotenv/config';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const {answer_1,answer_2,answer_3,answer_4,answer_5 } = process.env;

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Welcome Stranger... \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Noice, ${playerName}!. You saved me this time... Phheww` });
  } else {
    spinner.error({ text: `Aaaaggghhhh, I am dying because of you, ${playerName}! 💀💀💀` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Stranger';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (_err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `Thanks for trying this out. Btw the money mentioned above is just for fun...`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'What is the largest living animal you know?\n',
    choices: [
      'Elephant',
      'Giraffe',
      'Lion',
      'Blue Whale',
      'Panda', 
    ],
  });

  return handleAnswer(answers.question_1 === answer_1);
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'Which Greek historian is known as the “Father of History”? \n',
    choices: ['Herodotus', 'Xanthe', 'Achilles', 'Phaidra', 'Ouranos'],
  });
  return handleAnswer(answers.question_2 === answer_2);
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `Where did programmers learn to program? \n`,
    choices: ['Oxford', 'Stanford', 'StackOverflow', 'MIT', 'Cambridge'],
  });

  return handleAnswer(answers.question_3 === answer_3);
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'What is the golden rule in programming?\n',
    choices: [
      'Commit your lives to code.',
      `If it works, don't touch it.`,
      `It's not a bug. It's a feature`,
      'Eat. Sleep. Code. Repeat.',
    ],
  });
  return handleAnswer(answers.question_4 === answer_4);
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message:
      'How programmers open a Jar?\n',
    choices: ['By Hand', 'Break it, maybe?', 'Java', `Don't open. Just code.`],
  });

  return handleAnswer(answers.question_5 === answer_5);
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();