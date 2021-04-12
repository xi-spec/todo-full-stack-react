const {
  getAllLists,
  getOneListWithParams,
  createList,
  updateList,
  deleteList,
} = require('./toDoController');

const List = require('../models/toDoModel');

jest.mock('../models/toDoModel');

describe('Given a getAllLists', () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    req = {};
  });
  test('should call res.send', () => {
    List.find.mockImplementationOnce((query, callback) => callback(true));

    getAllLists(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  test('should call res.json', () => {
    List.find.mockImplementationOnce((query, callback) => callback(false, [1, 2, 3]));

    getAllLists(req, res);

    expect(res.json).toHaveBeenCalledWith([1, 2, 3]);
    expect(res.json).toHaveBeenCalled();
  });
});

describe('Given a getOneListWithParams', () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    req = { params: { listId: 1 } };
  });
  test('should call res.send', () => {
    List.findById.mockImplementationOnce((query, callback) => callback(true, [1, 2, 3]));

    getOneListWithParams(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  test('should call res.json', () => {
    List.findById.mockImplementationOnce((query, callback) => callback(false, [1, 2, 3]));

    getOneListWithParams(req, res);

    expect(res.json).toHaveBeenCalledWith([1, 2, 3]);
    expect(res.json).toHaveBeenCalled();
  });
});

describe('Given a createList', () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    req = { body: { } };
  });
  test('should call res.send', () => {
    createList(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});

describe('Given a updateList', () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    req = { body: { _id: 1 } };
  });
  test('should call res.send', () => {
    List.findByIdAndUpdate.mockImplementationOnce((id, query, callback) => callback(true));

    updateList(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  test('should call res.json', () => {
    List.findByIdAndUpdate.mockImplementationOnce((
      id, query, callback,
    ) => callback(false, [1, 2, 3]));

    updateList(req, res);

    expect(res.json).toHaveBeenCalledWith([1, 2, 3]);
    expect(res.json).toHaveBeenCalled();
  });
});

describe('Given a deleteList', () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };
    req = { body: { _id: 1 } };
  });
  test('should call res.send', () => {
    List.findByIdAndDelete.mockImplementationOnce((query, callback) => callback(true));

    deleteList(req, res);

    expect(res.send).toHaveBeenCalled();
  });

  test('should call res.json', () => {
    List.findByIdAndDelete.mockImplementationOnce((query, callback) => callback(false, [1, 2, 3]));

    deleteList(req, res);

    expect(res.json).toHaveBeenCalledWith([1, 2, 3]);
    expect(res.json).toHaveBeenCalled();
  });
});
