import Head from "next/head";
import styles from "@/styles/index.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home_container">
      <Head>
        <title>PDF to Voice Converter</title>
        <meta name="description" content="Convert PDFs to speech with ease" />
      </Head>

      <div className={styles.about}>
        <div className={styles.header}>
          <h1 className="text-3xl font-bold text-gray-800">
            PDF to Voice Converter
          </h1>
         
        </div>
        <h4 className="text-2xl font-semibold text-gray-700">Overview</h4>
            <p className="text-gray-600">
              The PDF to Voice Converter is a web application that transforms
              PDF documents into audio files, making content more accessible.
            </p>
        <div className={styles.content}>
          <article>
            

            <h4 className="text-2xl font-semibold text-gray-700 mb-2">
              Purpose
            </h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Enhance Accessibility for visually impaired users.</li>
              <li>Improve Convenience for multitasking.</li>
              <li>Promote Efficiency in consuming lengthy PDFs.</li>
            </ul>
          </article>
          <article>
            <h4 className="text-2xl font-semibold text-gray-700 mb-2">
              Features
            </h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>PDF Upload for text extraction.</li>
              <li>Text-to-Speech Conversion.</li>
              <li>Downloadable MP3 files.</li>
              <li>Responsive Design for all devices.</li>
            </ul>
          </article>
          <article>
            <h4 className="text-2xl font-semibold text-gray-700 mb-2">
              Technologies Used
            </h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                <strong>Frontend:</strong> React.js
              </li>
              <li>
                <strong>Backend:</strong> Next.js with API routes
              </li>
              <li>
                <strong>Text-to-Speech Engine:</strong> gTTS (Google
                Text-to-Speech)
              </li>
             
            </ul>
          </article>
          <article>
            <h4 className="text-2xl font-semibold text-gray-700 mb-2">
              How It Works
            </h4>
            <ul className="list-decimal list-inside text-gray-600">
              <li>Upload a PDF.</li>
              <li>Extract readable text.</li>
              <li>Convert text to audio.</li>
              <li>Download or play the audio.</li>
            </ul>
          </article>
          <article>
            <h4 className="text-2xl font-semibold text-gray-700 mb-2">
              Use Cases
            </h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Listening to study materials or reports.</li>
              <li>Improving accessibility for visually impaired users.</li>
              <li>Consuming lengthy PDFs more efficiently.</li>
            </ul>
          </article>
        </div>
        <p className="text-gray-700 text-lg mt-4">
          Thank you for exploring the PDF to Voice Converter! 😊
        </p>
      </div>
    </div>
  );
}
