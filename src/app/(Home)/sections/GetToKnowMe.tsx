import Widget from "@/components/ui/Widget";
import { getGoodreadsLink } from "@/lib/utils";
import Bookshelf from "@public/Widgets/Bookshelf.png";
import FaceEmoji from "@public/Widgets/emoji.png";

function GetToKnowMe() {
  return (
    <section aria-label="get to know me">
      <h2 className="mb-4 text-32 font-bold text-ink-strong xl:mb-8 xl:text-48">
        Get to know me
      </h2>
      <div className="space-y-9 xl:grid xl:grid-cols-2 xl:gap-4 xl:space-y-0">
        <Widget
          href="/about"
          title="About Me"
          image={FaceEmoji}
          imageAlt=""
          subtitle="Who I am and What I do"
        />

        {/* <Widget
          isComingSoon
          href="#"
          title="Tech Stack"
          image={TechStack}
          imageAlt="Tech Stack Image"
          subtitle="The dev tools, apps and devices I use"
        /> */}

        <Widget
          openInNewTab
          title="Bookshelf"
          image={Bookshelf}
          imageAlt=""
          href={getGoodreadsLink()}
          subtitle="Books I've enjoyed reading"
        />

        {/* <Widget
          href="#"
          isComingSoon
          title="Notebook"
          image={Notebook}
          imageAlt="Notebook image"
          subtitle="My thoughts, insights and reflections"
        /> */}
      </div>
    </section>
  );
}

export default GetToKnowMe;
