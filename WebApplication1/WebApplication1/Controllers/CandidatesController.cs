using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data.Core.Domain;
using WebApplication1.Data;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data.Persistence.Repositories;
using WebApplication1.Dto;
using WebApplication1.Data.Core.IRepositories;
using HrBackend.Data.Core;

namespace WebApplication1.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;

        public CandidatesController(HrPlatformContext context)
        {
            _unitOfWork = new UnitOfWork(context);
        }
         
        //GET /api/candidates
        [HttpGet]  
        public IEnumerable<CandidateDto> GetCandidates()
        {
            return _unitOfWork.Candidates.GetCandidatesWithSkills().Select(c=>c.AsDto()) ;
        }

        //GET /api/candidate/id
        [HttpGet("{id}")]
        public ActionResult<CandidateDto> GetCandidate(int id)
        {
            Candidate candidate = _unitOfWork.Candidates.GetSingleOrNullWithSkills(id);
            
            if (candidate is null)
                return NotFound();

            return candidate.AsDto();
        }

        //POST /api/candidates
        [HttpPost]
        public ActionResult<CandidateDto> CreateCandidate(CreateCandidateDto dto)
        {
            Candidate candidate = null;

            if (dto is null)
                return NotFound();
            else
                candidate = _unitOfWork.CreateCandidateFromDto(dto);

            if (candidate is null)
                return NotFound();
            else
                _unitOfWork.SaveChanges();

            return CreatedAtAction(nameof(GetCandidate),
                                    new { Id = candidate.Id }, 
                                    candidate.AsDto());
        }

        //PUT /api/candidates/id
        [HttpPut("{id}")]
        public ActionResult UpdateCandidate(int id,UpdateCandidateDto newCandidate)
        {
            bool result = _unitOfWork.UpdateCandidateFromDto(id, newCandidate);
            if(result == true)
            {
                _unitOfWork.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        //DELETE /api/candidates/id
        [HttpDelete("{id}")]
        public ActionResult DeleteCandidate(int id)
        {
            var candidate = _unitOfWork.Candidates.Get(id);

            if (candidate is null)
                return NotFound();

            _unitOfWork.Candidates.Remove(candidate);
            _unitOfWork.SaveChanges();

            return NoContent();
        }
    }
}
