import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ResourceItem, ResourceType } from './types';
import { Code, Key, Shield, Globe, Server, MoreHorizontal } from 'lucide-react';

interface CreateResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (resource: ResourceItem) => void;
  initialData?: ResourceItem | null;
}

export function CreateResourceDialog({ open, onOpenChange, onSave, initialData }: CreateResourceDialogProps) {
  const [type, setType] = useState<ResourceType>('snippet');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  
  // Type specific fields
  const [content, setContent] = useState(''); // snippet
  const [value, setValue] = useState(''); // key, secret
  const [url, setUrl] = useState(''); // bookmark
  const [ip, setIp] = useState(''); // server
  const [status, setStatus] = useState('active'); // server

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setTitle(initialData.title);
      setSubtitle(initialData.subtitle || '');
      setDescription(initialData.metadata.description || '');
      setTags(initialData.tags.join(', '));
      
      // Load type specific data
      if (initialData.type === 'snippet') setContent(initialData.content || '');
      if (initialData.type === 'key' || initialData.type === 'secret') setValue(initialData.metadata.value || '');
      if (initialData.type === 'bookmark') setUrl(initialData.metadata.url || '');
      if (initialData.type === 'server') {
        setIp(initialData.metadata.ip || '');
        setStatus(initialData.metadata.status || 'active');
      }
    } else {
      // Reset form
      setType('snippet');
      setTitle('');
      setSubtitle('');
      setDescription('');
      setTags('');
      setContent('');
      setValue('');
      setUrl('');
      setIp('');
      setStatus('active');
    }
  }, [initialData, open]);

  const handleSave = () => {
    const newResource: ResourceItem = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      type,
      title,
      subtitle,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: initialData?.createdAt || new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      content: type === 'snippet' ? content : undefined,
      metadata: {
        description,
        ...(type === 'key' || type === 'secret' ? { value } : {}),
        ...(type === 'bookmark' ? { url } : {}),
        ...(type === 'server' ? { ip, status } : {}),
      }
    };

    onSave(newResource);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#0d1117] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Resource' : 'Create Resource'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ResourceType)} disabled={!!initialData}>
              <SelectTrigger className="col-span-3 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c2128] border-white/10 text-white">
                <SelectItem value="snippet">Snippet</SelectItem>
                <SelectItem value="key">API Key</SelectItem>
                <SelectItem value="secret">Secret</SelectItem>
                <SelectItem value="bookmark">Bookmark</SelectItem>
                <SelectItem value="server">Server</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subtitle" className="text-right">Subtitle</Label>
            <Input 
              id="subtitle" 
              value={subtitle} 
              onChange={(e) => setSubtitle(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
              placeholder="e.g. React, Auth, Production"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">Tags</Label>
            <Input 
              id="tags" 
              value={tags} 
              onChange={(e) => setTags(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
              placeholder="Comma separated"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
            />
          </div>

          {/* Type Specific Fields */}
          {type === 'snippet' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">Code</Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                className="col-span-3 bg-white/5 border-white/10 text-white font-mono h-32" 
              />
            </div>
          )}

          {(type === 'key' || type === 'secret') && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">Value</Label>
              <Input 
                id="value" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="col-span-3 bg-white/5 border-white/10 text-white font-mono" 
                type={type === 'secret' ? 'password' : 'text'}
              />
            </div>
          )}

          {type === 'bookmark' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">URL</Label>
              <Input 
                id="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                className="col-span-3 bg-white/5 border-white/10 text-white" 
              />
            </div>
          )}

          {type === 'server' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ip" className="text-right">IP Address</Label>
                <Input 
                  id="ip" 
                  value={ip} 
                  onChange={(e) => setIp(e.target.value)} 
                  className="col-span-3 bg-white/5 border-white/10 text-white font-mono" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="col-span-3 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1c2128] border-white/10 text-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white">
            Save Resource
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
