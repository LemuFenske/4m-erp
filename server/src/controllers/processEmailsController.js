const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const { GMAIL_USERNAME, GMAIL_PASSWORD} = process.env;

const imapConfig = {
    user: GMAIL_USERNAME,
    password: GMAIL_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  };

const processEmails = () => {
  const imap = new Imap(imapConfig);

  imap.once('ready', () => {
    imap.openBox('INBOX', false, (err, box) => {
      if (err) throw err;
      imap.search(['UNSEEN'], (searchErr, results) => {
        if (searchErr) throw searchErr;
        const fetch = imap.fetch(results, { bodies: '', markSeen: true });
        fetch.on('message', (msg) => {
          msg.on('body', (stream, info) => {
            simpleParser(stream, (parseErr, parsed) => {
              if (parseErr) throw parseErr;
              console.log('From:', parsed.from.text);
              console.log('Subject:', parsed.subject);
              console.log('Body:', parsed.text);
              // Aquí puedes guardar la información en la base de datos
            });
          });
        });
        fetch.once('end', () => {
          imap.end();
        });
      });
    });
  });

  imap.once('error', (err) => {
    console.error('IMAP error:', err);
  });

  imap.once('end', () => {
    console.log('Disconnected from IMAP server');
  });

  imap.connect();
};

module.exports = processEmails;