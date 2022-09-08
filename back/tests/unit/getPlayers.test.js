const Room = require("../../Room");
// test for getting previous players for room with capacity of 4

test("get previous player id", () => {
    const room = new Room("1", 4, "makao");
    room.addPlayer("123", "kiwi");
    room.addPlayer("abc", "apple");
    room.addPlayer("69", "banana");
    room.addPlayer("420", "orange");
    expect(room.getPreviousPlayerId("123")).toBe("420");
    expect(room.getPreviousPlayerId("abc")).toBe("123");
    expect(room.getPreviousPlayerId("69")).toBe("abc");
    expect(room.getPreviousPlayerId("420")).toBe("69");
    expect(room.getPreviousPlayerId("1234")).toBe(null);
})

// test for getting next players for room with capacity of 4
test("get next player id", () => {
    const room = new Room("1", 4, "makao");
    room.addPlayer("123", "kiwi");
    room.addPlayer("abc", "apple");
    room.addPlayer("69", "banana");
    room.addPlayer("420", "orange");
    expect(room.getNextPlayerId("123")).toBe("abc");
    expect(room.getNextPlayerId("abc")).toBe("69");
    expect(room.getNextPlayerId("69")).toBe("420");
    expect(room.getNextPlayerId("420")).toBe("123");
    expect(room.getNextPlayerId("1234")).toBe(null);
})

