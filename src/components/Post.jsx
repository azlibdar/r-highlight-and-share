import { useEffect, useState, useCallback } from "react";
import ShareButton from "./ShareButton";
import { isMobileDevice } from "../utils/utils";

function Post() {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState(null);
  const [isOnMobile, setOnMobile] = useState(false);

  useEffect(() => {
    setOnMobile(isMobileDevice());
  }, []);

  const handleSelection = useCallback(() => {
    if (isOnMobile) return;

    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(text);
      setPosition({
        top: rect.top + window.scrollY - 50,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    } else {
      setSelectedText("");
      setPosition(null);
    }
  }, [isOnMobile]);

  const handleClickOutside = useCallback((e) => {
    const content = document.querySelector(".prose");
    if (!content.contains(e.target)) {
      setSelectedText("");
      setPosition(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleSelection, handleClickOutside]);

  return (
    <article className="prose lg:prose-lg selection:text-primary-900 selection:bg-blue-100">
      {selectedText && position && <ShareButton text={selectedText} position={position} />}

      <h1>The Future of Artificial Intelligence</h1>

      <h2>Introduction</h2>
      <p>
        Artificial Intelligence (AI) is rapidly evolving, influencing various aspects of our lives, from personal
        assistants like Siri and Alexa to sophisticated systems in healthcare, finance, and transportation. As AI
        continues to advance, it raises questions about its future impact on society, the economy, and the ethical
        considerations that come with it.
      </p>
      <p>
        Today, AI is already a significant part of our daily routines. Smartphones use AI for voice recognition, camera
        enhancements, and personalized recommendations. Streaming services like Netflix and Spotify employ AI algorithms
        to suggest content based on user preferences. In the coming years, AI is expected to become even more integrated
        into our lives, offering more personalized and efficient experiences.
      </p>

      <h2>AI in Healthcare</h2>
      <p>
        One of the most promising areas for AI development is healthcare. AI-powered systems can analyze vast amounts of
        medical data to assist doctors in diagnosing diseases more accurately and swiftly. Predictive analytics can help
        in identifying potential health risks, enabling preventative care.
      </p>
      <p>
        Moreover, AI-driven robots are being developed to perform surgeries with precision, reducing the chances of
        human error. The integration of AI in healthcare not only improves patient outcomes but also enhances the
        efficiency of healthcare delivery, making it more accessible to a broader population.
      </p>

      <h2>Transforming Transportation</h2>
      <p>
        The transportation industry is on the cusp of a revolution, thanks to AI. Autonomous vehicles are one of the
        most discussed innovations, with companies like Tesla, Waymo, and Uber investing heavily in self-driving
        technology. These vehicles promise to reduce accidents caused by human error, decrease traffic congestion, and
        provide mobility solutions for those unable to drive.
      </p>
      <p>
        Additionally, AI can optimize logistics and supply chain management, leading to more efficient and
        cost-effective transportation of goods. As AI continues to evolve, we can expect to see significant improvements
        in public transportation systems, making them more reliable and efficient.
      </p>

      <h2>Ethical Considerations</h2>
      <p>
        As AI technology advances, ethical considerations become increasingly important. Issues such as data privacy,
        bias in AI algorithms, and the potential for AI to be used in harmful ways must be addressed. Ensuring that AI
        is developed and deployed responsibly requires collaboration between technologists, policymakers, and ethicists.
      </p>
      <p>
        Establishing clear guidelines and regulations can help mitigate risks and promote the positive use of AI. It is
        crucial to develop frameworks that ensure transparency and accountability in AI systems, fostering public trust
        in these technologies.
      </p>

      <h2>Conclusion</h2>
      <p>
        Looking ahead, the future of AI holds endless possibilities. AI could lead to breakthroughs in fields like
        climate science, helping us better understand and mitigate the effects of climate change. In entertainment,
        AI-generated content could revolutionize the way we create and consume media.
      </p>
      <p>
        The future of AI is both exciting and challenging. As this technology continues to evolve, it will undoubtedly
        shape the world in ways we cannot yet fully imagine. Embracing the potential of AI while addressing its risks
        and ethical implications will be crucial in ensuring that its benefits are realized for all of humanity. By
        fostering a collaborative approach to AI development, we can harness its power to create a better future.
      </p>
    </article>
  );
}

export default Post;
