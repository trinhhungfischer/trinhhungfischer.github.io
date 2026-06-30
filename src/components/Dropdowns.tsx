import { useState, useRef, useEffect } from 'react';

export const MultiSelectDropdown = ({ options, selected, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item: string) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 ? `${placeholder} (${selected.length})` : placeholder}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option: string) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export const GroupedMultiSelectDropdown = ({ groups, selected, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item: string) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const toggleGroup = (groupOptions: string[]) => {
    const allSelected = groupOptions.every(opt => selected.includes(opt));
    if (allSelected) {
      onChange(selected.filter((item: string) => !groupOptions.includes(item)));
    } else {
      const newSelected = [...selected];
      groupOptions.forEach(opt => {
        if (!newSelected.includes(opt)) newSelected.push(opt);
      });
      onChange(newSelected);
    }
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 ? `${placeholder} (${selected.length})` : placeholder}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu" style={{ maxHeight: '400px', overflowY: 'auto', minWidth: '220px' }}>
          {groups.map((group: any, idx: number) => {
            if (group.options.length === 0) return null;
            const isAllSelected = group.options.every((opt: string) => selected.includes(opt));
            
            return (
              <div key={idx} style={{ paddingBottom: '8px', marginBottom: '8px', borderBottom: idx < groups.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <label className="dropdown-item" style={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() => toggleGroup(group.options)}
                  />
                  {group.label}
                </label>
                <div style={{ paddingLeft: '16px' }}>
                  {group.options.map((option: string) => (
                    <label key={option} className="dropdown-item" style={{ fontSize: '0.9rem' }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => toggleOption(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const SingleSelectDropdown = ({ options, selected, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected === 'All' ? placeholder : `${placeholder}: ${selected}`}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option: string) => (
            <div 
              key={option} 
              className={`dropdown-item ${selected === option ? 'selected' : ''}`}
              onClick={() => { onChange(option); setIsOpen(false); }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
