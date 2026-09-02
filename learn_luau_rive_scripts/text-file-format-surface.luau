-- Current editor TextFileFormat surface fixture.
-- This is an editor extension protocol; exported documents become Blob assets.

local format: TextFileFormat = {
    name = "Notes",
    extensions = { "note" },
}

function format.highlight(
    _self: TextFileFormat,
    doc: FormatDocument,
    _parsed: buffer?
): { FormatToken }
    local text = doc.text
    if text == nil or #text == 0 then
        return {}
    end

    return {{
        line = 0,
        column = 0,
        length = #text,
        scope = "string",
    }}
end

function format.diagnostics(
    _self: TextFileFormat,
    doc: FormatDocument,
    _parsed: buffer?
): { FormatDiagnostic }
    if doc.text == nil then
        return {{
            startLine = 0,
            startColumn = 0,
            endLine = 0,
            endColumn = 0,
            message = "Expected a text document",
            severity = "error",
        }}
    end

    return {}
end

return function(): TextFileFormat
    return format
end
