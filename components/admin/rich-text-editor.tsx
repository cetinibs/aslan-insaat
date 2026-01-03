"use client"

import { useEffect, useRef, useState } from "react"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editorRef = useRef<any>(null)
    const [editorLoaded, setEditorLoaded] = useState(false)
    const [CKEditor, setCKEditor] = useState<any>(null)
    const [ClassicEditor, setClassicEditor] = useState<any>(null)

    useEffect(() => {
        // CKEditor'ı dinamik olarak yükle (SSR uyumluluğu için)
        const loadEditor = async () => {
            try {
                const CKEditorModule = await import("@ckeditor/ckeditor5-react")
                const ClassicEditorModule = await import("@ckeditor/ckeditor5-build-classic")

                setCKEditor(() => CKEditorModule.CKEditor)
                setClassicEditor(() => ClassicEditorModule.default)
                setEditorLoaded(true)
            } catch (error) {
                console.error("CKEditor yüklenirken hata:", error)
            }
        }

        loadEditor()
    }, [])

    if (!editorLoaded || !CKEditor || !ClassicEditor) {
        return (
            <div className="w-full min-h-[300px] border rounded-lg p-4 bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500 text-sm">Editör yükleniyor...</div>
            </div>
        )
    }

    return (
        <div className="ckeditor-wrapper">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    placeholder: placeholder || "İçeriğinizi buraya yazın...",
                    toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "|",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "outdent",
                        "indent",
                        "|",
                        "blockQuote",
                        "insertTable",
                        "|",
                        "undo",
                        "redo"
                    ],
                    heading: {
                        options: [
                            { model: "paragraph", title: "Paragraf", class: "ck-heading_paragraph" },
                            { model: "heading1", view: "h1", title: "Başlık 1", class: "ck-heading_heading1" },
                            { model: "heading2", view: "h2", title: "Başlık 2", class: "ck-heading_heading2" },
                            { model: "heading3", view: "h3", title: "Başlık 3", class: "ck-heading_heading3" },
                            { model: "heading4", view: "h4", title: "Başlık 4", class: "ck-heading_heading4" }
                        ]
                    },
                    table: {
                        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
                    },
                    language: "tr"
                }}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData()
                    onChange(data)
                }}
                onReady={(editor: any) => {
                    editorRef.current = editor
                }}
            />
            <style jsx global>{`
        .ckeditor-wrapper .ck-editor__editable {
          min-height: 300px;
          max-height: 500px;
        }
        .ckeditor-wrapper .ck-editor__editable:focus {
          border-color: hsl(var(--primary)) !important;
          box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2) !important;
        }
        .ckeditor-wrapper .ck.ck-toolbar {
          border-radius: 8px 8px 0 0 !important;
        }
        .ckeditor-wrapper .ck.ck-editor__main > .ck-editor__editable {
          border-radius: 0 0 8px 8px !important;
        }
      `}</style>
        </div>
    )
}
