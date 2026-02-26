'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Certificate = {
  id: string;
  fullname: string;
  training: string;
  training_start_date?: string;
  training_end_date?: string;
  award_date?: string;
  control_number?: string;
  created_at: string;
};

export default function VerifyPage({
  params,
  searchParams,
}: {
  params: { qrCodeId: string };
  searchParams: { token?: string };
}) {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const { qrCodeId } = params;
        const token = searchParams.token;

        if (!qrCodeId || !token) {
          setError('Invalid verification link');
          setLoading(false);
          return;
        }

        // Query the certificates table for this QR code ID and token
        const { data, error: queryError } = await supabase
          .from('certificates')
          .select('id, fullname, training, training_start_date, training_end_date, award_date, control_number, created_at')
          .match({ qr_code_id: qrCodeId, qr_verification_token: token })
          .single();

        if (queryError || !data) {
          setError('Certificate not found or invalid');
          setLoading(false);
          return;
        }

        setCertificate(data as Certificate);
        setError(null);
      } catch (err) {
        setError('An error occurred while verifying the certificate');
        console.error('Verification error:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [params, searchParams]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Verifying certificate...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
            Verification Failed
          </h2>
          <p className="text-slate-600 text-center">{error}</p>
        </div>
      </main>
    );
  }

  if (!certificate) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <p className="text-slate-600">Certificate not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-3xl">
        {/* CERTIFIED Badge */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-30" />
            <div className="relative bg-white border-4 border-green-500 rounded-full w-24 h-24 flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">✓</div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Certificate Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10 pb-8 border-b-2 border-slate-100">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Certificate Verified
              </h1>
              <p className="text-lg text-green-600 font-semibold">
                ✓ Authentic and Valid
              </p>
            </div>

            {/* Certificate Details */}
            <div className="space-y-8">
              {/* Recipient Name - Prominent */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  Awarded To
                </label>
                <p className="text-3xl font-bold text-slate-900">
                  {certificate.fullname}
                </p>
              </div>

              {/* Training Program */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  Training Program
                </label>
                <p className="text-xl font-semibold text-slate-900">
                  {certificate.training}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Training Period
                  </label>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    {certificate.training_start_date && certificate.training_end_date
                      ? `${certificate.training_start_date} to ${certificate.training_end_date}`
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Date Awarded
                  </label>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    {certificate.award_date || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Issued Date
                  </label>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    {new Date(certificate.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Control Number - For verification */}
              {certificate.control_number && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Control Number
                  </label>
                  <p className="text-sm md:text-base font-mono font-bold text-slate-900 break-all">
                    {certificate.control_number}
                  </p>
                </div>
              )}
            </div>

            {/* Footer with Verification Message */}
            <div className="mt-12 pt-8 border-t-2 border-slate-100">
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <p className="text-sm text-green-900 font-semibold text-center">
                  ✓ This certificate has been verified and is legitimate
                </p>
                <p className="text-xs text-slate-600 text-center mt-3">
                  Certificate ID: <span className="font-mono font-bold">{certificate.id}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Bottom Bar */}
          <div className="h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500" />
        </div>

        {/* Timestamp */}
        <div className="text-center mt-6 text-xs text-slate-500">
          Verified on {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </main>
  );
}
