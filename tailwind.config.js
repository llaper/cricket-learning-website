/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				// 基于设计Tokens的颜色系统
				primary: {
					50: '#e3f2fd',
					100: '#bbdefb',
					500: '#2196f3',
					700: '#1976d2',
					900: '#0d47a1',
					DEFAULT: '#2196f3',
					foreground: '#ffffff',
				},
				neutral: {
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#e0e0e0',
					300: '#bdbdbd',
					700: '#616161',
					800: '#424242',
					850: '#303030',
					900: '#212121',
					950: '#121212',
				},
				semantic: {
					success: '#4caf50',
					warning: '#ff9800',
					error: '#f44336',
					info: '#2196f3',
				},
				background: {
					primary: '#212121',
					secondary: '#303030',
					elevated: '#424242',
					overlay: 'rgba(0, 0, 0, 0.6)',
					DEFAULT: '#212121',
				},
				// 保留shadcn/ui的默认变量
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				foreground: 'hsl(var(--foreground))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			fontFamily: {
				display: ['Noto Serif SC', 'Georgia', 'serif'],
				heading: ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				body: ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				mono: ['Fira Code', 'Courier New', 'monospace'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.2' }],
				'sm': ['0.875rem', { lineHeight: '1.4' }],
				'base': ['1rem', { lineHeight: '1.6' }],
				'lg': ['1.125rem', { lineHeight: '1.8' }],
				'xl': ['1.25rem', { lineHeight: '1.4' }],
				'2xl': ['1.5rem', { lineHeight: '1.2' }],
				'3xl': ['1.875rem', { lineHeight: '1.2' }],
				'4xl': ['2.25rem', { lineHeight: '1.2' }],
				'5xl': ['3rem', { lineHeight: '1.2' }],
			},
			spacing: {
				'1': '4px',
				'2': '8px',
				'3': '12px',
				'4': '16px',
				'5': '20px',
				'6': '24px',
				'8': '32px',
				'10': '40px',
				'12': '48px',
				'16': '64px',
				'20': '80px',
				'24': '96px',
				'32': '128px',
			},
			borderRadius: {
				'sm': '4px',
				'md': '8px',
				'lg': '12px',
				'xl': '16px',
				'full': '9999px',
			},
			boxShadow: {
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
