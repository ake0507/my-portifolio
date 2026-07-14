# Aklilu Desalegn – Portfolio Website

A dynamic, conversion-focused portfolio built from the creative brief. Includes a Next.js frontend with all portfolio sections and a backend API for client contact emails.

## Features

- **Homepage Hero** with CTAs and experience badge
- **About / Bio** section with personal introduction
- **Skills & Tech Stack** organized by category
- **Services** – Full-Stack Development, Graphic Design, Virtual Assistant
- **Problem Showcase** – client challenges and solutions
- **Case Studies** with before/after placeholders
- **Pricing** comparison table with tiered packages
- **Testimonials** carousel with keyboard-accessible controls
- **Project Timeline** visual flow
- **Contact Form** with backend email delivery
- **SEO metadata** and accessibility (WCAG-minded markup)

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/) for SMTP email
- [Zod](https://zod.dev/) for form validation

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure email (required for contact form)

Copy the example env file and fill in your SMTP credentials:

```bash
cp .env.example .env.local
```

**Gmail setup:**
1. Enable 2-Factor Authentication on your Google account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the app password

**Other providers:** Update `SMTP_HOST` and `SMTP_PORT` for your provider (e.g. Outlook, SendGrid SMTP, Mailgun).

### 3. Customize content

Edit `src/lib/data.ts` to update:
- Personal info (name, email, social links)
- Skills, services, case studies
- Pricing packages and testimonials

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form API

`POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I'd like to discuss a project."
}
```

Returns `{ "success": true, "message": "..." }` on success.

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Email backend
│   ├── layout.tsx             # SEO metadata
│   ├── page.tsx               # Main page
│   └── globals.css
├── components/                # Section components
└── lib/
    ├── data.ts                # Portfolio content (dynamic data)
    └── email.ts               # Nodemailer service
```

## Deployment

Deploy to [Vercel](https://vercel.com/) or any Node.js host. Add the same environment variables from `.env.local` in your hosting dashboard.

```bash
npm run build
npm start
```

## License

Private – © Aklilu Desalegn
