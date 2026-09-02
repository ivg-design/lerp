-- Current editor FileFormat surface fixture.
-- This validates the binary protocol declaration; runtime exports use Blob.

local format: FileFormat = {
    name = "Model",
    extensions = { "model" },
}

function format.parse(
    _self: FileFormat,
    doc: FormatDocument
): buffer?
    return doc.bytes
end

return function(): FileFormat
    return format
end
