using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Data.Core.Domain
{
    public class Candidate
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        //YYYY-MM-DD za sve
        public DateTime DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string EMail { get; set; }

       
        public ICollection<CandidateSkill> Skills { get; set; }

        public Candidate()
        {
            Skills = new List<CandidateSkill>();
        }
    }
}
