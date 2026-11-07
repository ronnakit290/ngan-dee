import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// GitHub Pages serves 404.html for unknown paths. A copy of the SPA shell
// keeps deep links working for routes like /events/lanna-lantern-festival.
const dist = 'dist'
const index = join(dist, 'index.html')

if (existsSync(index)) {
  copyFileSync(index, join(dist, '404.html'))
  console.log('✓ dist/404.html created for SPA deep links')
}
