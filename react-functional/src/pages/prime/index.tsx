import React, {useState, useRef} from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { SpeedDial } from 'primereact/speeddial';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { MenuItem } from 'primereact/menuitem';
import { DeferredContent } from 'primereact/deferredcontent';

const ExampleComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [date, setDate] = useState('');
  const toast: any = useRef<Toast>(null);
  const items: MenuItem[] = [
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    },
    {
        label: 'React Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://facebook.github.io/react/';
        }
    }
];

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  
  const handleButtonClick = () => {
    alert(`You entered: ${inputValue}`);
  };
  const onImageLoad = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Image loaded' });
};
  
  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <div className="example-component">
        <label>Calender</label><br/>
        <Calendar name='calender' value={date} onChange={(e: any) => setDate(e.value)} />
        
        <div style={{height: '100px'}} />
        
        <Toast ref={toast} />
        <SpeedDial model={items} direction="left" style={{ top: 'calc(50% - 2rem)', right: 0 }} />
        
        <Card title="Example Component">
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="input-text">Enter some text:</label>
              <InputText id="input-text" value={inputValue} onChange={handleInputChange} />
            </div>
            <div className="p-field" style={{marginTop: '10px'}}>
              <Button label="Submit" onClick={handleButtonClick} />
            </div>
          </div>
        </Card>

        <div style={{height: '100px'}} />

        <div className="card" style={{textAlign: 'center'}}>
            <div style={{height: '50em'}}>
              <p >Scroll down to lazy load an image.</p>
            </div>
            <Toast ref={toast} />
            <DeferredContent onLoad={onImageLoad}>
                <img className="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg" alt="Prime" />
            </DeferredContent>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
