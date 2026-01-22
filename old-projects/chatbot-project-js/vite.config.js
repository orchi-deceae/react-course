import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
        babel: {
            plugins: [['babel-plugin-react-compiler', { target: '19' }]],
        },
        })
  ],
  base: '/chatbot-project'
})
// npm install --save-dev babel-plugin-react-compiler@rc 