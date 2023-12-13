const { expect } = require('chai');
const sinon = require('sinon');
const { LessonRepository } = require('../../../api/repositories');

describe('LessonRepository', () => {
   describe('upsert', () => {
      it('should upsert lesson with updates if lesson has an id', async () => {
         const fakeLesson = { id: 1, name: 'Fake Lesson' };
         const fakeUpdates = { name: 'Updated Lesson' };

         const updateStub = sinon.stub(LessonRepository, 'update').resolves();
         const result = await LessonRepository.upsert(fakeLesson, fakeUpdates);

         expect(result).to.include({ id: fakeLesson.id, ...fakeUpdates });
         expect(updateStub.calledOnceWithExactly({ id: fakeLesson.id }, sinon.match(fakeUpdates))).to.be.true;

         updateStub.restore();
      });

      it('should save lesson with createdAt if lesson has no id', async () => {
         const fakeLesson = { name: 'New Lesson' };
         const fakeSavedLesson = { id: 2, name: 'New Lesson', createdAt: new Date() };

         const saveStub = sinon.stub(LessonRepository, 'save').resolves(fakeSavedLesson);
         const result = await LessonRepository.upsert(fakeLesson, {});

         expect(result).to.include(fakeSavedLesson);
         expect(saveStub.calledOnceWithExactly(sinon.match(fakeLesson))).to.be.true;

         saveStub.restore();
      });
   });

   describe('findById', () => {
      it('should find lesson by id', async () => {
         const fakeId = 1;
         const fakeLesson = { id: fakeId, name: 'Fake Lesson' };

         const findOneStub = sinon.stub(LessonRepository, 'findOne').resolves(fakeLesson);
         const result = await LessonRepository.findById(fakeId);

         expect(result).to.deep.equal(fakeLesson);
         expect(findOneStub.calledOnceWithExactly({ id: fakeId })).to.be.true;

         findOneStub.restore();
      });
   });

   describe('findByQuery', () => {
      it('should find lessons by query', async () => {
         const fakeQuery = { category: 'Math' };
         const fakeLessons = [
            { id: 1, name: 'Math Lesson 1' },
            { id: 2, name: 'Math Lesson 2' },
         ];

         const findStub = sinon.stub(LessonRepository, 'find').resolves(fakeLessons);
         const result = await LessonRepository.findByQuery(fakeQuery);

         expect(result).to.deep.equal(fakeLessons);
         expect(findStub.calledOnceWithExactly(sinon.match(fakeQuery))).to.be.true;

         findStub.restore();
      });
   });
});
