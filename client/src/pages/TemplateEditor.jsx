import { useState, useEffect } from 'react';
import { createTemplate } from '../api';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TemplateEditor() {
  const [template, setTemplate] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('mergedTemplate'));
    if (data) {
      setTemplate(data);
    }
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(template.questions);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTemplate({ ...template, questions: reordered });
  };

  const handleSave = async () => {
    const payload = {
      name,
      createdBy: 'admin', // Add auth later
      modulesIncluded: template.modulesIncluded,
      questions: template.questions
    };
    const res = await createTemplate(payload);
    alert(`Template saved! ID: ${res.data._id}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit RFP Template</h1>
      <input
        className="w-full border p-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Template Name"
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rfp-questions">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {template?.questions.map((q, index) => (
                <Draggable key={q.questionId} draggableId={q.questionId} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="p-3 border rounded mb-2 bg-white shadow"
                    >
                      <input
                        type="text"
                        className="w-full"
                        value={q.customText}
                        onChange={(e) => {
                          const newQ = [...template.questions];
                          newQ[index].customText = e.target.value;
                          setTemplate({ ...template, questions: newQ });
                        }}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-700 text-white px-6 py-2 rounded"
      >
        Save Template
      </button>
    </div>
  );
}
