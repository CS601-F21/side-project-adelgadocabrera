import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { NONAME } from "dns";
const MDReactEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface Props {
  value: string;
  callback: Function;
  height?: number;
  minHeight?: number;
}

const MDEditor: React.FC<Props> = ({ value, callback, height, minHeight }) => {
  return (
    <MDReactEditor
      style={{
        fontFamily: "Fira Code, Consolas, Menlo, Droid Sans Mono, Dejavu Sans",
        fontWeight: 500,
        border: "none",
        boxShadow: "none",
        backgroundColor: "rgb(255, 255, 255, 0.6)",
        padding: "10px 0 10px 10px",
      }}
      height={height ?? 200}
      minHeight={minHeight ?? 200}
      preview="edit"
      value={value}
      onChange={(e?: string) => callback(e ? e : "")}
    />
  );
};

export default MDEditor;
