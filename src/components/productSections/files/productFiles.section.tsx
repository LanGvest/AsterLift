import type {ProductSectionProps} from "@/types/product";
import {memo} from "react";
import type {CSSProperties} from "react";
import s from "./productFiles.module.scss";
import type {FileExtension, FilePath} from "@/types/media";
import {sizeToString} from "@/utils/helpers";
import Link from "next/link";

function getFileExtension(path: FilePath): FileExtension {
	return path.split(".").at(-1) as FileExtension;
}

function getFileStyle(extension: FileExtension): CSSProperties {
	switch(extension) {
		case "pdf": return {
			color: "white",
			background: "#ff3131"
		};
		case "doc":
		case "docx": return {
			color: "white",
			background: "#337cf1"
		};
		case "png":
		case "jpg":
		case "jpeg": return {
			color: "white",
			background: "#23c932"
		};
		default: return {};
	}
}

function Section({product}: ProductSectionProps) {
	return (
		<div className={s.container}>
			{product.files.map(file => {
				const extension = getFileExtension(file.path);

				return (
					<Link
						href={`/files/products/${product.id}/${file.path}`}
						target={"_blank"}
						key={file.path}
						className={s.card}
						title={file.name}
					>
						<p className={s.extension} style={getFileStyle(extension)}>{extension}</p>
						<div className={s.info}>
							<p className={s.name}>{file.name}</p>
							<p className={s.description}>{file.path} <span>•</span> {sizeToString(file.size)}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export const ProductFilesSection = memo(Section);