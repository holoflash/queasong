import { playlistDescription } from "./playlistDescription";

describe("playlistDescription function", () => {
    it("returns the correct description for undefined members", () => {
        const members = undefined;
        expect(playlistDescription(members)).toBe("Something went wrong while creating a description.");
    });

    it("returns the correct description for an array of two members", () => {
        const members = [
            { name: "Host" },
            { name: "Guest" },
        ];
        expect(playlistDescription(members)).toBe(
            "A playlist created by Host and Guest."
        );
    });

    it("returns the correct description for an array of three members", () => {
        const members = [
            { name: "Host" },
            { name: "Guest 1" },
            { name: "Guest 2" },
        ];
        expect(playlistDescription(members)).toBe(
            "A playlist created by Host, Guest 1 and Guest 2."
        );
    });

    it("returns the correct description for an array of five members", () => {
        const members = [
            { name: "Host" },
            { name: "Guest 1" },
            { name: "Guest 2" },
            { name: "Guest 3" },
            { name: "Guest 4" },
            { name: "Guest 5" },
        ];
        expect(playlistDescription(members)).toBe(
            "A playlist created by Host, Guest 1, Guest 2, Guest 3, Guest 4 and Guest 5."
        );
    });

});
