# Certificate Verification App

A minimal Next.js application for verifying certificate authenticity via QR code scanning.

## Overview

This app is designed to be a lightweight, secure verification portal where users can scan QR codes embedded in certificates to verify their authenticity. It connects to the same Supabase database as the main FurmaCert app but provides only read-only verification functionality.

## Features

- 🔍 QR code verification
- 📄 Certificate details display
- 🎯 Minimal, focused UI
- 🔒 No authentication required (read-only access)
- 📱 Mobile-friendly design
- 🚀 Vercel ready

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account with access to the main FurmaCert database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` based on `.env.example`:
```bash
cp .env.example .env.local
```

3. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Run the development server on port 3001:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the home page.

Test verification: [http://localhost:3001/verify/test-id?token=test-token](http://localhost:3001/verify/test-id?token=test-token)

### Production

Build and start production server:
```bash
npm run build
npm start
```

## How It Works

1. User scans QR code from certificate
2. QR encodes: `https://verify-app-url.com/verify/{qrCodeId}?token={verificationToken}`
3. App queries Supabase for matching certificate
4. If found and valid, displays certificate details
5. If not found or token invalid, shows error

## Database

The app queries the `certificates` table from the main FurmaCert Supabase instance:

```sql
SELECT id, fullname, training_name, training_date_text, date_awarded_text, control_number_full, created_at
FROM certificates
WHERE qr_code_id = $1 AND verification_token = $2
```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Security Notes

- ✅ Read-only access (no write capability)
- ✅ Uses Supabase RLS policies
- ✅ No user authentication needed
- ✅ Only shows verified certificate data

## Related

This is a companion app to [FurmaCert](../). The main app generates certificates with QR codes that link here for verification.

## License

Proprietary
