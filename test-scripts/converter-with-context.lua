--!strict
-- CONVERTER WITH CONTEXT TEST
-- Does converter init accept (self, context)?
-- Course shows both patterns - need to verify

export type ConverterCtx = {
    context: Context,
}

-- Test: Does converter init accept context parameter?
function init(self: ConverterCtx, context: Context): boolean
    self.context = context
    print("=== CONVERTER CONTEXT TEST ===")
    print("init(self, context) accepted: true")
    print("context exists: " .. tostring(context ~= nil))
    print("==============================")
    return true
end

function convert(self: ConverterCtx, input: DataValueNumber): DataValueNumber
    return input
end

function reverseConvert(self: ConverterCtx, input: DataValueNumber): DataValueNumber
    return input
end

return function(): Converter<ConverterCtx, DataValueNumber, DataValueNumber>
    return {
        init = init,
        convert = convert,
        reverseConvert = reverseConvert,
        context = late(),
    }
end
