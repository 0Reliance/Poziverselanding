import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Project } from '../data/projects';
import { Layout } from 'lucide-react';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (project: Project) => void;
  initialData?: Project | null;
}

export function CreateProjectDialog({ open, onOpenChange, onSave, initialData }: CreateProjectDialogProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'completed' | 'archived' | 'in-progress'>('active');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [techStack, setTechStack] = useState('');
  const [color, setColor] = useState<'cyan' | 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange'>('cyan');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubtitle(initialData.subtitle);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setLiveUrl(initialData.liveUrl);
      setRepoUrl(initialData.repoUrl);
      setTechStack(initialData.techStack.join(', '));
      setColor(initialData.color);
    } else {
      setTitle('');
      setSubtitle('');
      setDescription('');
      setStatus('active');
      setLiveUrl('');
      setRepoUrl('');
      setTechStack('');
      setColor('cyan');
    }
  }, [initialData, open]);

  const handleSave = () => {
    const newProject: Project = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      title,
      subtitle,
      description,
      status,
      liveUrl,
      repoUrl,
      techStack: techStack.split(',').map(t => t.trim()).filter(Boolean),
      color,
      lastUpdated: 'Just now',
      icon: Layout, // Default icon for now
      progress: initialData?.progress || 0,
      collaborators: initialData?.collaborators || [],
      activity: initialData?.activity || [],
      stats: initialData?.stats || { views: 0, stars: 0, forks: 0 },
      isStarred: initialData?.isStarred || false
    };

    onSave(newProject);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#0d1117] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Project' : 'Create Project'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger className="col-span-3 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c2128] border-white/10 text-white">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">Color</Label>
            <Select value={color} onValueChange={(v: any) => setColor(v)}>
              <SelectTrigger className="col-span-3 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c2128] border-white/10 text-white">
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="techStack" className="text-right">Tech Stack</Label>
            <Input 
              id="techStack" 
              value={techStack} 
              onChange={(e) => setTechStack(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
              placeholder="React, TypeScript, Tailwind"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="liveUrl" className="text-right">Live URL</Label>
            <Input 
              id="liveUrl" 
              value={liveUrl} 
              onChange={(e) => setLiveUrl(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="repoUrl" className="text-right">Repo URL</Label>
            <Input 
              id="repoUrl" 
              value={repoUrl} 
              onChange={(e) => setRepoUrl(e.target.value)} 
              className="col-span-3 bg-white/5 border-white/10 text-white" 
            />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white">
            Save Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
