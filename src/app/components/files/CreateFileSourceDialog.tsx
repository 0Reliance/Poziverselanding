import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { FileSource } from '../../data/files';
import { Cloud, Server, Database, Laptop, Network, HardDrive } from 'lucide-react';

interface CreateFileSourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (source: FileSource) => void;
  initialData?: FileSource | null;
}

export function CreateFileSourceDialog({ open, onOpenChange, onSave, initialData }: CreateFileSourceDialogProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'cloud' | 'server' | 'local' | 'network' | 'container'>('cloud');
  const [provider, setProvider] = useState<'gdrive' | 'dropbox' | 's3' | 'smb' | 'ssh' | 'local' | 'docker'>('gdrive');
  const [path, setPath] = useState('');
  const [color, setColor] = useState<'cyan' | 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange'>('blue');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setProvider(initialData.provider);
      setPath(initialData.path);
      setColor(initialData.color);
    } else {
      setName('');
      setType('cloud');
      setProvider('gdrive');
      setPath('');
      setColor('blue');
    }
  }, [initialData, open]);

  const handleSave = () => {
    const newSource: FileSource = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      name,
      type,
      provider,
      status: 'connected', // Default to connected for now
      path,
      capacity: initialData?.capacity || { used: 0, total: 100 },
      lastSync: 'Just now',
      icon: type === 'cloud' ? Cloud : type === 'server' ? Server : type === 'local' ? Laptop : type === 'network' ? Network : Database,
      color
    };
    onSave(newSource);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0A0A0A] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit File Source' : 'Add File Source'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
              placeholder="e.g. Personal Drive"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="network">Network (NAS)</SelectItem>
                  <SelectItem value="container">Container</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={(v: any) => setProvider(v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                  <SelectItem value="gdrive">Google Drive</SelectItem>
                  <SelectItem value="dropbox">Dropbox</SelectItem>
                  <SelectItem value="s3">AWS S3</SelectItem>
                  <SelectItem value="ssh">SSH / SFTP</SelectItem>
                  <SelectItem value="smb">SMB / CIFS</SelectItem>
                  <SelectItem value="local">Local Filesystem</SelectItem>
                  <SelectItem value="docker">Docker Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="path">Path / Connection String</Label>
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="bg-white/5 border-white/10 text-white font-mono text-sm"
              placeholder="e.g. /mnt/data or user@host:/path"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="color">Color Theme</Label>
            <Select value={color} onValueChange={(v: any) => setColor(v)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                <SelectItem value="cyan">Cyan</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/10 hover:bg-white/5 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-600 text-black">
            {initialData ? 'Save Changes' : 'Add Source'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
