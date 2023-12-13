const { expect } = require('chai');
const sinon = require('sinon');
const { UserRepository } = require('../../../api/repositories');

describe('UserRepository', () => {
   describe('upsert', () => {
      it('should upsert user with updates if user has an id', async () => {
         const fakeUser = { id: 1, userName: 'john.doe' };
         const fakeUpdates = { email: 'john.doe@example.com' };

         const updateStub = sinon.stub(UserRepository, 'update').resolves();
         const saveStub = sinon.stub(UserRepository, 'save').resolves({ id: 1, ...fakeUpdates });

         const result = await UserRepository.upsert(fakeUser, fakeUpdates);

         expect(result).to.include({ id: fakeUser.id, ...fakeUpdates });
         expect(updateStub.calledOnceWithExactly({ id: fakeUser.id }, sinon.match(fakeUpdates))).to.be.true;
         expect(saveStub.notCalled).to.be.true;

         updateStub.restore();
         saveStub.restore();
      });

      it('should save user with createdAt if user has no id', async () => {
         const fakeUser = { userName: 'newuser' };
         const fakeSavedUser = { id: 2, userName: 'newuser', createdAt: new Date() };

         const updateStub = sinon.stub(UserRepository, 'update').resolves();
         const saveStub = sinon.stub(UserRepository, 'save').resolves(fakeSavedUser);

         const result = await UserRepository.upsert(fakeUser, {});

         expect(result).to.include(fakeSavedUser);
         expect(saveStub.calledOnceWithExactly(sinon.match(fakeUser))).to.be.true;
         expect(updateStub.notCalled).to.be.true;

         updateStub.restore();
         saveStub.restore();
      });
   });

   describe('findById', () => {
      it('should find user by id and remove sensitive data if removeSensitiveData is true', async () => {
         const fakeId = 1;
         const fakeUser = { id: fakeId, userName: 'john.doe', password: 'hashedpassword' };

         const findOneStub = sinon.stub(UserRepository, 'findOne').resolves(fakeUser);

         const result = await UserRepository.findById(fakeId, true);

         expect(result).to.deep.equal({ id: fakeUser.id, userName: fakeUser.userName });
         expect(findOneStub.calledOnceWithExactly({ id: fakeId })).to.be.true;

         findOneStub.restore();
      });

      it('should find user by id without removing sensitive data if removeSensitiveData is false', async () => {
         const fakeId = 1;
         const fakeUser = { id: fakeId, userName: 'john.doe', password: 'hashedpassword' };

         const findOneStub = sinon.stub(UserRepository, 'findOne').resolves(fakeUser);

         const result = await UserRepository.findById(fakeId, false);

         expect(result).to.deep.equal(fakeUser);
         expect(findOneStub.calledOnceWithExactly({ id: fakeId })).to.be.true;

         findOneStub.restore();
      });
   });

   describe('findByUsernameOrEmail', () => {
      it('should find users by username or email and remove sensitive data if removeSensitiveData is true', async () => {
         const fakeValue = 'john.doe@example.com';
         const fakeUsers = [{ id: 1, userName: 'john.doe', password: 'hashedpassword' }];

         const findStub = sinon.stub(UserRepository, 'find').resolves(fakeUsers);

         const result = await UserRepository.findByUsernameOrEmail(fakeValue, true);

         expect(result).to.deep.equal([{ id: fakeUsers[0].id, userName: fakeUsers[0].userName }]);
         expect(
            findStub.calledOnceWithExactly({
               where: [{ userName: fakeValue }, { email: fakeValue }],
            }),
         ).to.be.true;

         findStub.restore();
      });

      it('should find users by username or email without removing sensitive data if removeSensitiveData is false', async () => {
         const fakeValue = 'john.doe@example.com';
         const fakeUsers = [{ id: 1, userName: 'john.doe', password: 'hashedpassword' }];

         const findStub = sinon.stub(UserRepository, 'find').resolves(fakeUsers);

         const result = await UserRepository.findByUsernameOrEmail(fakeValue, false);

         expect(result).to.deep.equal(fakeUsers);
         expect(
            findStub.calledOnceWithExactly({
               where: [{ userName: fakeValue }, { email: fakeValue }],
            }),
         ).to.be.true;

         findStub.restore();
      });
   });

   describe('findByQuery', () => {
      it('should find users by query and remove sensitive data if removeSensitiveData is true', async () => {
         const fakeQuery = { role: 'admin' };
         const fakeUsers = [{ id: 1, userName: 'admin', password: 'hashedpassword' }];

         const findStub = sinon.stub(UserRepository, 'find').resolves(fakeUsers);

         const result = await UserRepository.findByQuery(fakeQuery, true);

         expect(result).to.deep.equal([{ id: fakeUsers[0].id, userName: fakeUsers[0].userName }]);
         expect(findStub.calledOnceWithExactly(sinon.match(fakeQuery))).to.be.true;

         findStub.restore();
      });

      it('should find users by query without removing sensitive data if removeSensitiveData is false', async () => {
         const fakeQuery = { role: 'admin' };
         const fakeUsers = [{ id: 1, userName: 'admin', password: 'hashedpassword' }];

         const findStub = sinon.stub(UserRepository, 'find').resolves(fakeUsers);

         const result = await UserRepository.findByQuery(fakeQuery, false);

         expect(result).to.deep.equal(fakeUsers);
         expect(findStub.calledOnceWithExactly(sinon.match(fakeQuery))).to.be.true;

         findStub.restore();
      });
   });
});
