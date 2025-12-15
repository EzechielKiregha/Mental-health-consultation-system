use mental_health_consult_db;

select * from user;
select * from mental_health_resource;

insert into role (id, name) values(1, 'ADMIN');
insert into role (id, name) values(2, 'PATIENT');
insert into role (id, name) values(3, 'THERAPIST');
insert into role (id, name) values(4, 'MANAGER');

show tables;

desc users_roles;
desc mental_health_resource;

delete from users_roles where user_id=1;
delete from user where id=1;

# populate with resources
INSERT INTO mental_health_resource
(title, content, question_index, resource_type, therapist_id)
VALUES
(
  'Finding Joy in Everyday Activities',
  'When motivation feels low, joy often disappears from daily life. Start small by noticing one pleasant moment each day—such as enjoying a warm drink, listening to music, or feeling sunlight on your skin. Try a short gratitude journal by writing down three simple things you appreciated today. Mindful walks, where you focus on sights, sounds, and smells, can also gently reconnect you with positive emotions without pressure.',
  0,
  'EXERCISE',
  NULL
),
(
  'Managing Low Mood',
  'Low mood can affect thoughts, energy, and motivation. This guide introduces cognitive strategies to identify and gently challenge negative thinking patterns. You will also learn how to create small, achievable daily routines—like regular wake-up times and short activities—that can help stabilize mood. Remember: progress is gradual, and consistency matters more than intensity.',
  1,
  'GUIDE',
  NULL
),
(
  'Improving Sleep Hygiene',
  'Quality sleep plays a major role in emotional well-being. Improve sleep hygiene by establishing a consistent bedtime routine, reducing screen exposure at least one hour before bed, and creating a calm, dark, and cool sleep environment. Avoid caffeine late in the day and try relaxation techniques such as slow breathing or gentle stretching before sleeping.',
  2,
  'ARTICLE',
  NULL
),
(
  'Boost Your Energy Levels',
  'Persistent fatigue can be physical or emotional. Support your energy levels by staying hydrated, getting natural light exposure in the morning, and incorporating brief movement breaks throughout the day. Even light stretching or a short walk can increase alertness. Balanced rest is just as important as activity—listen to your body.',
  3,
  'GUIDE',
  NULL
),
(
  'Healthy Eating Habits',
  'Nutrition affects both the body and the mind. This article explores mindful eating—paying attention to hunger and fullness cues without judgment. Focus on balanced meals that include whole foods, proteins, and vegetables. Avoid rigid food rules, and aim for flexibility and nourishment rather than perfection.',
  4,
  'ARTICLE',
  NULL
),
(
  'Focus & Concentration Exercises',
  'Difficulty concentrating is common during stress or emotional strain. Try structured techniques such as the Pomodoro Technique (25 minutes of focus followed by a short break). Simple mindfulness exercises—like focusing on your breath for one minute—can help retrain attention over time. Reduce distractions and be patient with yourself.',
  5,
  'EXERCISE',
  NULL
),
(
  'Anxiety Management Techniques',
  'Anxiety can cause racing thoughts and physical tension. Learn calming techniques such as slow diaphragmatic breathing, grounding exercises using the five senses, and scheduling a specific “worry time” to prevent constant rumination. These tools help create a sense of control and safety in moments of stress.',
  6,
  'GUIDE',
  NULL
);

