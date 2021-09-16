using HrBackend.Data.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;
using WebApplication1.Data.Core.Domain;
using WebApplication1.Dto;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;

        public SkillsController(HrPlatformContext context)
        {
            _unitOfWork = new UnitOfWork(context);
        }

        //GET api/skills
        [HttpGet]
        public IEnumerable<SkillDto> GetSkills()
        {
            return _unitOfWork.Skills.GetAll().Select(s => s.AsDto());
        }

        //GET api/skills/{id}
        [HttpGet("{id}")]
        public ActionResult<SkillDto> GetSkill(int id)
        {
            Skill skill = _unitOfWork.Skills.GetSingleOrNull(s=>s.Id == id);

            if (skill is null)
                return NotFound();

            return skill.AsDto();
        }
        
        //POST api/skills
        [HttpPost]
        public ActionResult<SkillDto> CreateSkill(CreateSkillDto dto)
        {
            if (dto is null)
                return NotFound();

           Skill skill = _unitOfWork.CreateSkillFromDto(dto);
            _unitOfWork.SaveChanges();

            return CreatedAtAction(nameof(GetSkill), new { Id = skill.Id }, skill.AsDto());
        }

        //PUT api/skills/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateSkill(int id, UpdateSkillDto dto)
        {
            var result = _unitOfWork.UpdateSkillFromDto(id, dto);

            if (result == true)
                _unitOfWork.SaveChanges();
            else
                return NotFound();

            return NoContent();
        }

        //DELETE api/skills/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteSkill(int id)
        {
            Skill skill = _unitOfWork.Skills.Get(id);

            if (skill is null)
                return NotFound();

            _unitOfWork.Skills.Remove(skill);
            _unitOfWork.SaveChanges();

            return NoContent();
        }
    }
}
