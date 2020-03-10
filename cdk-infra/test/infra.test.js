"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const Infra = require("../lib/infra-stack");
test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infra.InfraStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.matchTemplate({
        "Resources": {}
    }, assert_1.MatchStyle.EXACT));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZnJhLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBaUY7QUFDakYscUNBQXFDO0FBQ3JDLDRDQUE2QztBQUU3QyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtJQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixPQUFPO0lBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN2RCxPQUFPO0lBQ1AsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBYSxDQUFDO1FBQ2hDLFdBQVcsRUFBRSxFQUFFO0tBQ2hCLEVBQUUsbUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IGFzIGV4cGVjdENESywgbWF0Y2hUZW1wbGF0ZSwgTWF0Y2hTdHlsZSB9IGZyb20gJ0Bhd3MtY2RrL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgSW5mcmEgPSByZXF1aXJlKCcuLi9saWIvaW5mcmEtc3RhY2snKTtcblxudGVzdCgnRW1wdHkgU3RhY2snLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICAvLyBXSEVOXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgSW5mcmEuSW5mcmFTdGFjayhhcHAsICdNeVRlc3RTdGFjaycpO1xuICAgIC8vIFRIRU5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKG1hdGNoVGVtcGxhdGUoe1xuICAgICAgXCJSZXNvdXJjZXNcIjoge31cbiAgICB9LCBNYXRjaFN0eWxlLkVYQUNUKSlcbn0pO1xuIl19