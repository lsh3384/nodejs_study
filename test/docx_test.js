const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, SectionType, UnderlineType, Table, TableRow, TableCell, WidthType, HeightRule } = require("docx")


// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section


const text = new TextRun({
 text: "and then underlined ",
 underline: {
   type: UnderlineType.DOUBLE,
   color: "990011",
 },
});


const tableRow = new TableRow({
 children: [
   new TableCell({
     children: [new Paragraph("one cell")],
   }),
   new TableCell({
     children: [new Paragraph("two cell")],
   }),
 ],
 height: { 
   value: 1000, 
   rule: HeightRule 
 },
});


const table = new Table({
 rows: [tableRow],
 indent: {
   size: 600,
   type: WidthType.DXA,
 },
 width: {
   size: 4000,
   type: WidthType.DXA,
 }
});

const doc = new Document({
 sections: [{
     properties: {
         type: SectionType.CONTINUOUS,
     },
     children: [
       new Paragraph({
         children: [new TextRun("First paragraph!!!!"), new TextRun("First one!"), text],
       }),
       new Paragraph({
         children: [new TextRun("Second paragraph!!!!"), new TextRun("Second one!")],
       }),
       table,
     ],
 }]
});
// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
   fs.writeFileSync("My Document.docx", buffer);
});


// Done! A file called 'My Document.docx' will be in your file system.