import Crawler from "crawler";
import * as fs from "fs";

import { Signature, Period } from "./model";

const getLink = (suffix: string) =>
  "https://agilemanifesto.org/display/" + suffix;

export default function cache() {
  let periods: Period[] = [];

  const c = new Crawler({
    callback: (err, res, done) => {
      if (err) throw err;

      const $ = res.$;

      // Get period
      const period = $("center > p:first-of-type tr:first-of-type b")
        .text()
        .split(": ")
        .pop();

      // Push the period with all the signatures
      periods.push({
        signatures: fetchSignatures($),
        period,
      });

      done();
    },
  });

  fetchLinks(c);

  setTimeout(() => {
    fs.writeFile("data.json", JSON.stringify(periods, null, 2), (err) => {
      if (err) throw err;
    });
  }, 5000);
}

function fetchSignatures($: cheerio.CheerioAPI): Signature[] {
  let signatures: Signature[] = [];

  // For each column
  $("center > p:first-of-type tr:nth-of-type(2) td").each((_, el) => {
    // Links
    $(el)
      .find("a[href^=mailto]")
      .each((_, elIn) => {
        const element = $(elIn);

        const name = element.text();
        const mail = element.attr("href");
        const websiteLink = $(el).find("a[href^=mailto]+a").attr("href");

        signatures.push(new Signature(name, mail, websiteLink));
      });

    // Bolded names
    $(el)
      .find("b")
      .each((_, elIn) => {
        const name = $(elIn).text();
        const websiteLink = $(el).find("b+a").attr("href");

        signatures.push(new Signature(name, null, websiteLink));
      });
  });

  return signatures;
}

function fetchLinks(c: Crawler) {
  c.direct({
    uri: getLink("index.html"),
    callback: (err, res) => {
      if (err) throw err;

      const $ = res.$;

      $("a").each((_, el) => {
        const href = $(el).attr("href");
        c.queue(getLink(href));
      });
    },
  });
}

cache();
