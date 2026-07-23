import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "about.html",
  "services.html",
  "portfolio.html",
  "contact.html",
  "privacy.html",
  "support.html",
];

function read(page) {
  return fs.readFileSync(path.join(root, page), "utf8");
}

for (const page of pages) {
  test(`${page} exists`, () => {
    assert.equal(fs.existsSync(path.join(root, page)), true);
  });
}

test("clickshower homepage and contact details are branded correctly", () => {
  const home = read("index.html");
  const contact = read("contact.html");
  const support = read("support.html");
  assert.match(home, /ClickShower/i);
  assert.match(home, /IAA monetization/i);
  assert.match(contact, /vip@clickshower\.com/i);
  assert.match(contact, /business@clickshower\.com/i);
  assert.match(contact, /support@clickshower\.com/i);
  assert.match(support, /support@clickshower\.com/i);
});

test("clickshower pages include shared assets and support links", () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /assets\/css\/styles\.css/i);
    assert.match(html, /assets\/js\/site\.js/i);
    assert.match(html, /href="privacy\.html"/i);
    assert.match(html, /href="support\.html"/i);
  }
});

test("clickshower privacy page includes expanded policy sections", () => {
  const html = read("privacy.html");
  assert.match(html, /Privacy Policy/i);
  assert.match(html, /Information We Collect/i);
  assert.match(html, /Third-Party Services/i);
  assert.match(html, /Data Retention/i);
  assert.match(html, /Your Rights/i);
});
