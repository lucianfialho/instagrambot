const PrismaClient = require('@prisma/client').PrismaClient
const prompt = require('prompt-sync')();
  
const prisma = new PrismaClient();

(async () => {
    const username = prompt('What is your username?');
    const user_id = prompt('What is your user_id?');
    const followers = prompt('Total followers of your instagram account:');
    const user_token = prompt('What is your user_token?');

    const user = await prisma.user.create({
        data:{
            username: username,
            user_id: user_id,
            followers: parseInt(followers),
            user_token: user_token
        }
    });
    console.log(JSON.stringify(user))
})();