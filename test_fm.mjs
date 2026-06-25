import fm from 'front-matter';

try {
    const markdown = `---\ntitle: test\n---\nbody`;
    const result = fm(markdown);
    console.log("fm success", result.attributes);
} catch (e) {
    console.error("fm error", e);
}
