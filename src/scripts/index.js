import "styles/index.scss";
import { initRealEstateSection } from "./sections";

const main = document.querySelector("main");
const realEstate = main?.querySelector("section.real-estate");

realEstate && initRealEstateSection(realEstate);
