import chalk from 'chalk';
import axios from 'axios';
import inquirer from 'inquirer';
async function fetchSearchResults(query, limit, relatedKeywords) {
    const options = {
        method: 'GET',
        url: 'https://google-search74.p.rapidapi.com/',
        params: {
            query,
            limit,
            related_keywords: String(relatedKeywords),
        },
        headers: {
            'X-RapidAPI-Key': 'f02251ccebmshdfad8df46ea52f8p15aaa6jsn132f93690f1c',
            'X-RapidAPI-Host': 'google-search74.p.rapidapi.com',
        },
    };
    try {
        const response = await axios.request(options);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching search results:', error);
        return null;
    }
}
async function main() {
    const { query, limit, relatedKeywords } = await inquirer.prompt([
        {
            type: 'input',
            name: 'query',
            message: chalk.blueBright('Enter search query:'),
        },
        {
            type: 'input',
            name: 'limit',
            message: chalk.cyanBright('Enter limit for results (default: 10):'),
            default: '10',
        },
        {
            type: 'confirm',
            name: 'relatedKeywords',
            message: 'Include related keywords?',
            default: true,
        },
    ]);
    const searchResults = await fetchSearchResults(query, limit, relatedKeywords);
    if (searchResults) {
        console.log(searchResults);
    }
    else {
        console.log('Failed to fetch search results.');
    }
}
main();
