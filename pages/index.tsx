import styles from "@/styles/index.module.css";
import Head from "next/head";
export default function About() {
  return (
    <>
      <Head>
        <title>PDF to Voice Converter</title>
        <meta name="description" content="Convert PDFs to speech with ease" />
      </Head>
      <div className="home_container">
        <div className={styles.index}>
          <div className={styles.header}>
            <h2>About PDF to Voice Converter</h2>
            <p>
              Welcome to PDF to Voice Converter, your go-to solution for
              converting PDF documents into spoken audio! Our web application is
              designed to make your reading experience more accessible and
              convenient.
            </p>
          </div>
          <article>
            <h4>What We Offer:</h4>
            <ul>
              <li>
                <span>Efficient Conversion:</span>
                <p>
                  With our PDF to voice conversion technology, you can quickly
                  transform your PDF files into high-quality audio format
                </p>
              </li>
              <li>
                <span>Customization Options:</span>
                <p>
                  {" "}
                  Tailor the audio output according to your preferences. Adjust
                  the voice, speed, and volume to suit your listening needs.
                </p>
              </li>
              <li>
                <span>Accessibility:</span>
                <p>
                  We believe in making information accessible to everyone. Our
                  tool helps individuals with visual impairments, learning
                  disabilities, or busy schedules to access content
                  effortlessly.
                </p>
              </li>
              <li>
                <span>User-Friendly Interface:</span>
                <p>
                  {" "}
                  Our intuitive interface ensures a seamless experience for
                  users of all levels. Simply upload your PDF, customize the
                  settings, and convert it to audio with ease.
                </p>
              </li>
            </ul>
          </article>
          <article>
            <h4>How Its Works:</h4>
            <ul>
              <li>
                <span>Upload PDF:</span>
                <p>
                  Select the PDF document you want to convert by uploading it to
                  our platform.
                </p>
              </li>
              <li>
                <span>Customize Settings:</span>
                <p>
                  Choose your preferred voice, speed, and volume settings to
                  personalize the audio output.
                </p>
              </li>
              <li>
                <span>Convert to Audio:</span>
                <p>
                  Click on the convert button, and within moments, your PDF will
                  be transformed into spoken audio.
                </p>
              </li>
              <li>
                <span>Download or Listen Online:</span>
                <p>
                  Download the audio file to listen to it offline, or stream it
                  directly from our website.
                </p>
              </li>
            </ul>
          </article>
          <article>
            <h4>Why Choose Us:</h4>
            <ul>
              <li>
                <span>Reliability:</span>
                <p>
                  {" "}
                  Our advanced conversion technology ensures accurate and
                  reliable results every time.
                </p>
              </li>
              <li>
                <span>Accessibility:</span>
                <p>
                  - We are committed to making information accessible to all
                  users, regardless of their abilities or circumstances.
                </p>
              </li>
              <li>
                <span>User Satisfaction:</span>
                <p>
                  {" "}
                  We prioritize user satisfaction and continuously strive to
                  enhance our services based on user feedback.
                </p>
              </li>
            </ul>
            <p>
              Experience the convenience and accessibility of PDF to Voice
              Converter today!
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
