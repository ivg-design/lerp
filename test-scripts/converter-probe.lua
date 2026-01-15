--!strict
-- CONVERTER PROBE: Tests if init receives Context

export type ConverterProbe = {}

-- Test: Does converter init receive context?
-- Official docs show init(self) only, no Context
function init(self: ConverterProbe): boolean
    print("=== CONVERTER PROBE ===")
    print("init called with self only")
    print("=======================")
    return true
end

function convert(self: ConverterProbe, input: DataValueNumber): DataValueNumber
    print("convert called, input.value = " .. tostring(input.value))
    return input
end

function reverseConvert(self: ConverterProbe, input: DataValueNumber): DataValueNumber
    return input
end

return function(): Converter<ConverterProbe, DataValueNumber, DataValueNumber>
    return {
        init = init,
        convert = convert,
        reverseConvert = reverseConvert,
    }
end
