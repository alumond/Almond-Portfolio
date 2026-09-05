import assert from "node:assert/strict";
import test from "node:test";
import { redirectUnoptimizedImage } from "../worker/image-fallback.mjs";

const request = source => new Request(`http://localhost:3000/_vinext/image?url=${encodeURIComponent(source)}&w=640&q=75`);
test("a missing image binding falls back to the original portrait", () => {
  const response = redirectUnoptimizedImage(request('/images/almond-working.jpeg'));
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), 'http://localhost:3000/images/almond-working.jpeg');
});
test("image fallback rejects remote URLs, traversal, and optimizer recursion", () => {
  for (const source of ['https://example.com/image.jpg','//example.com/image.jpg','/\\example.com/images/photo.jpg','/images/../private','/_vinext/image?url=/images/example.jpg']) {
    assert.equal(redirectUnoptimizedImage(request(source)).status, 400, source);
  }
});
