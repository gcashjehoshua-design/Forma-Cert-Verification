'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Certificate = {
  id: string;
  fullname: string;
  training_name: string;
  training_date_text: string;
  date_awarded_text: string;
  control_number_full: string;
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
          .select('id, fullname, training_name, training_date_text, date_awarded_text, control_number_full, created_at')
          .match({ qr_code_id: qrCodeId, verification_token: token })
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
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        {/* Success Header */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Certificate Verified
        </h1>
        <p className="text-slate-600 text-center mb-8">
          This certificate is authentic and valid
        </p>

        {/* Certificate Details */}
        <div className="space-y-6 border-t border-slate-200 pt-6">
          <div>
            <label className="text-sm font-semibold text-slate-600 uppercase">
              Recipient Name
            </label>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {certificate.fullname}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600 uppercase">
              Training Program
            </label>
            <p className="text-lg text-slate-900 mt-1">
              {certificate.training_name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-600 uppercase">
                Training Period
              </label>
              <p className="text-slate-900 mt-1">{certificate.training_date_text}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600 uppercase">
                Date Awarded
              </label>
              <p className="text-slate-900 mt-1">{certificate.date_awarded_text}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600 uppercase">
              Control Number
            </label>
            <p className="text-slate-900 font-mono mt-1">
              {certificate.control_number_full}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-600 uppercase">
              Issue Date
            </label>
            <p className="text-slate-900 mt-1">
              {new Date(certificate.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            This certificate has been verified and is legitimate.
            <br />
            Certificate ID: {certificate.id}
          </p>
        </div>
      </div>
    </main>
  );
}
