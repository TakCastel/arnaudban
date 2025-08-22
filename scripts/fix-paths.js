const fs = require('fs');
const path = require('path');

// Fonction pour remplacer les chemins absolus par des chemins relatifs
function fixPaths(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixPaths(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remplacer les chemins absolus par des chemins relatifs
      content = content.replace(/href="\/_next\//g, 'href="./_next/');
      content = content.replace(/src="\/_next\//g, 'src="./_next/');
      content = content.replace(/href="\/assets\//g, 'href="./assets/');
      content = content.replace(/src="\/assets\//g, 'src="./assets/');
      content = content.replace(/href="\/favicon/g, 'href="./favicon');
      content = content.replace(/href="\/site.webmanifest/g, 'href="./site.webmanifest');
      content = content.replace(/href="\/sitemap.xml/g, 'href="./sitemap.xml');
      content = content.replace(/href="\/robots.txt/g, 'href="./robots.txt');
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed paths in: ${filePath}`);
    }
  });
}

// Démarrer la correction depuis le dossier out
const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
  console.log('Fixing absolute paths in build output...');
  fixPaths(outDir);
  console.log('Path fixing completed!');
} else {
  console.error('Build output directory not found. Run "npm run build" first.');
}
